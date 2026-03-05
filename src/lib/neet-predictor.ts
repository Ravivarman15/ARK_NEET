// NEET Rank Predictor - Calculation Logic
// Based on weighted PCB model with interpolated score-rank mapping

const scoreRankMap = [
  { score: 720, rank: 1 },
  { score: 700, rank: 100 },
  { score: 650, rank: 3000 },
  { score: 600, rank: 15000 },
  { score: 550, rank: 35000 },
  { score: 500, rank: 70000 },
  { score: 450, rank: 120000 },
  { score: 400, rank: 180000 },
  { score: 350, rank: 250000 },
  { score: 300, rank: 400000 },
  { score: 250, rank: 600000 },
  { score: 200, rank: 900000 },
  { score: 150, rank: 1200000 },
];

const stateFactors: Record<string, number> = {
  "Andhra Pradesh": 0.08,
  "Arunachal Pradesh": 0.01,
  "Assam": 0.04,
  "Bihar": 0.10,
  "Chhattisgarh": 0.03,
  "Goa": 0.01,
  "Gujarat": 0.07,
  "Haryana": 0.04,
  "Himachal Pradesh": 0.02,
  "Jharkhand": 0.04,
  "Karnataka": 0.09,
  "Kerala": 0.06,
  "Madhya Pradesh": 0.08,
  "Maharashtra": 0.11,
  "Manipur": 0.01,
  "Meghalaya": 0.01,
  "Mizoram": 0.01,
  "Nagaland": 0.01,
  "Odisha": 0.05,
  "Punjab": 0.04,
  "Rajasthan": 0.08,
  "Sikkim": 0.01,
  "Tamil Nadu": 0.07,
  "Telangana": 0.06,
  "Tripura": 0.01,
  "Uttar Pradesh": 0.12,
  "Uttarakhand": 0.02,
  "West Bengal": 0.08,
  "Delhi": 0.03,
  "Jammu & Kashmir": 0.02,
  "Ladakh": 0.01,
  "Puducherry": 0.01,
  "Chandigarh": 0.01,
};

export const states = Object.keys(stateFactors).sort();

export const boards = [
  "CBSE",
  "ICSE",
  "State Board",
  "NIOS",
  "Other",
];

export const attempts = ["1st Attempt", "Dropper", "Repeat Dropper"];

export const categories = ["General", "OBC", "SC", "ST", "EWS"];

export interface AcademicInput {
  physics: number;
  chemistry: number;
  biology: number;
  board: string;
  attempt: string;
  expectedScore?: number;
}

export interface LeadInfo {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  state: string;
  category: string;
}

export interface PredictionResult {
  predictedScore: number;
  scoreRange: [number, number];
  predictedAIR: number;
  airRange: [number, number];
  stateRank: number;
  stateRankRange: [number, number];
  govtProbability: number;
  aiqProbability: number;
  riskLevel: "Low" | "Moderate" | "High";
  riskMessage: string;
  improvementTip: string;
}

function predictScoreFrom12th(physics: number, chemistry: number, biology: number, attempt: string): { predictedScore: number; range: [number, number] } {
  const pcbPercentage = ((physics + chemistry + biology) / 300) * 100;
  let baseScore = pcbPercentage * 6.5;

  if (attempt === "Dropper") baseScore += 40;
  if (attempt === "Repeat Dropper") baseScore += 20;

  const lower = Math.max(0, Math.round(baseScore - 30));
  const upper = Math.min(720, Math.round(baseScore + 30));

  return { predictedScore: Math.round(baseScore), range: [lower, upper] };
}

function interpolateRank(score: number): number {
  if (score >= scoreRankMap[0].score) return scoreRankMap[0].rank;
  if (score <= scoreRankMap[scoreRankMap.length - 1].score) return scoreRankMap[scoreRankMap.length - 1].rank;

  for (let i = 0; i < scoreRankMap.length - 1; i++) {
    const upper = scoreRankMap[i];
    const lower = scoreRankMap[i + 1];
    if (score <= upper.score && score >= lower.score) {
      const ratio = (score - lower.score) / (upper.score - lower.score);
      return Math.round(lower.rank + ratio * (upper.rank - lower.rank));
    }
  }
  return 250000;
}

function predictStateRank(air: number, state: string): number {
  const factor = stateFactors[state] || 0.1;
  return Math.max(1, Math.round(air * factor));
}

function calculateGovtProbability(score: number, category: string): number {
  if (category === "General") {
    if (score >= 620) return 90;
    if (score >= 580) return 70;
    if (score >= 540) return 50;
    if (score >= 500) return 30;
    return 15;
  }
  if (category === "OBC" || category === "EWS") {
    if (score >= 580) return 85;
    if (score >= 540) return 65;
    if (score >= 500) return 45;
    return 30;
  }
  // SC/ST
  if (score >= 500) return 90;
  if (score >= 450) return 75;
  if (score >= 400) return 60;
  return 40;
}

function calculateAIQProbability(score: number, category: string): number {
  const govtProb = calculateGovtProbability(score, category);
  return Math.max(10, Math.round(govtProb * 0.65));
}

function getRiskAnalysis(score: number, category: string): { level: "Low" | "Moderate" | "High"; message: string; tip: string } {
  const prob = calculateGovtProbability(score, category);

  if (prob >= 70) {
    return {
      level: "Low",
      message: "You are in a strong position for Government MBBS seats. Maintain consistency and focus on high-weight chapters.",
      tip: "Focus on revision and mock tests to maintain your score."
    };
  }
  if (prob >= 40) {
    const deficit = category === "General" ? 580 - score : 540 - score;
    const improvementNeeded = Math.max(0, deficit);
    return {
      level: "Moderate",
      message: `You are borderline for Government MBBS under AIQ. Improving by +${Math.max(15, improvementNeeded)} marks increases probability significantly.`,
      tip: `Focus on Physics and high-weight Biology chapters for quick score gains.`
    };
  }
  return {
    level: "High",
    message: "Government seat probability is low at current score. Significant improvement needed through structured preparation.",
    tip: "Enroll in a focused programme with daily practice tests and doubt-clearing sessions."
  };
}

export function predictNEET(input: AcademicInput, lead: LeadInfo): PredictionResult {
  const useExpected = input.expectedScore && input.expectedScore > 0;
  const fromMarks = predictScoreFrom12th(input.physics, input.chemistry, input.biology, input.attempt);

  const score = useExpected ? input.expectedScore! : fromMarks.predictedScore;
  const scoreRange: [number, number] = useExpected
    ? [Math.max(0, score - 20), Math.min(720, score + 20)]
    : fromMarks.range;

  const air = interpolateRank(score);
  const airLower = interpolateRank(scoreRange[1]);
  const airUpper = interpolateRank(scoreRange[0]);

  const stateRank = predictStateRank(air, lead.state);
  const stateRankLower = predictStateRank(airLower, lead.state);
  const stateRankUpper = predictStateRank(airUpper, lead.state);

  const govtProb = calculateGovtProbability(score, lead.category);
  const aiqProb = calculateAIQProbability(score, lead.category);
  const risk = getRiskAnalysis(score, lead.category);

  return {
    predictedScore: score,
    scoreRange,
    predictedAIR: air,
    airRange: [airLower, airUpper],
    stateRank,
    stateRankRange: [stateRankLower, stateRankUpper],
    govtProbability: govtProb,
    aiqProbability: aiqProb,
    riskLevel: risk.level,
    riskMessage: risk.message,
    improvementTip: risk.tip,
  };
}

// Score improvement simulator
export function simulateImprovement(baseInput: AcademicInput, lead: LeadInfo, improvement: number): PredictionResult {
  const adjusted = {
    ...baseInput,
    expectedScore: (baseInput.expectedScore || predictScoreFrom12th(baseInput.physics, baseInput.chemistry, baseInput.biology, baseInput.attempt).predictedScore) + improvement,
  };
  return predictNEET(adjusted, lead);
}
