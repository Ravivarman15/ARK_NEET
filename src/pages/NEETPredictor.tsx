import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaWhatsapp, FaPhoneAlt, FaChartLine, FaUniversity, FaMapMarkerAlt, FaShieldAlt, FaSlidersH } from 'react-icons/fa';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi2';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE_URL } from '@/config/api';
import {
  predictNEET, simulateImprovement,
  states, boards, attempts, categories,
  type AcademicInput, type LeadInfo, type PredictionResult
} from '@/lib/neet-predictor';

const phoneNumber = "917639399217";
const whatsappMessage = "Hi ARK Team, I reviewed my diagnostic report and would like to proceed with consulting.";
const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

type Step = 'hero' | 'academic' | 'lead' | 'result';

const NEETPredictor = () => {
  const [step, setStep] = useState<Step>('hero');
  const [academicInput, setAcademicInput] = useState<AcademicInput>({
    physics: 0, chemistry: 0, biology: 0,
    board: '', attempt: '', expectedScore: undefined,
  });
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({
    studentName: '', parentName: '', phone: '', email: '', state: '', category: '',
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [improvement, setImprovement] = useState(0);
  const [improvedResult, setImprovedResult] = useState<PredictionResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const webhookSentRef = useRef(false);

  const validateAcademic = () => {
    const e: Record<string, string> = {};
    if (academicInput.physics < 0 || academicInput.physics > 100) e.physics = "Enter valid marks (0-100)";
    if (academicInput.chemistry < 0 || academicInput.chemistry > 100) e.chemistry = "Enter valid marks (0-100)";
    if (academicInput.biology < 0 || academicInput.biology > 100) e.biology = "Enter valid marks (0-100)";
    if (!academicInput.board) e.board = "Select your board";
    if (!academicInput.attempt) e.attempt = "Select attempt type";
    if (academicInput.expectedScore !== undefined && (academicInput.expectedScore < 0 || academicInput.expectedScore > 720)) {
      e.expectedScore = "Enter valid score (0-720)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateLead = () => {
    const e: Record<string, string> = {};
    if (!leadInfo.studentName.trim()) e.studentName = "Required";
    if (!leadInfo.parentName.trim()) e.parentName = "Required";
    if (!leadInfo.phone.trim() || leadInfo.phone.length < 10) e.phone = "Enter valid phone";
    if (!leadInfo.email.trim() || !leadInfo.email.includes('@')) e.email = "Enter valid email";
    if (!leadInfo.state) e.state = "Select state";
    if (!leadInfo.category) e.category = "Select category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAcademicSubmit = () => {
    if (validateAcademic()) setStep('lead');
  };

  const handleLeadSubmit = () => {
    if (!validateLead()) return;
    const prediction = predictNEET(academicInput, leadInfo);
    setResult(prediction);
    setImprovement(0);
    setImprovedResult(null);
    setStep('result');

    // Fire-and-forget: send lead data to backend → Zapier
    // Do NOT block prediction result display
    if (!webhookSentRef.current) {
      webhookSentRef.current = true;
      fetch(`${API_BASE_URL}/api/leads/rank-prediction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadInfo.studentName,
          email: leadInfo.email,
          phone: leadInfo.phone,
        }),
      }).catch(err => console.error('[RANK_PREDICTION_WEBHOOK]', err));
    }
  };

  const handleImprovement = useCallback((val: number) => {
    setImprovement(val);
    if (val > 0) {
      setImprovedResult(simulateImprovement(academicInput, leadInfo, val));
    } else {
      setImprovedResult(null);
    }
  }, [academicInput, leadInfo]);

  const displayResult = improvedResult || result;

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ark-yellow transition-all";
  const selectClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ark-yellow transition-all appearance-none";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <main className="overflow-hidden min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* HERO */}
          {step === 'hero' && (
            <motion.section
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              className="gradient-hero min-h-[80vh] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-ark-yellow/10 rounded-full blur-3xl"
                />
              </div>
              <div className="container mx-auto px-4 text-center relative z-10 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 bg-ark-yellow/20 text-ark-yellow px-4 py-2 rounded-full mb-6">
                    <HiSparkles />
                    <span className="font-semibold text-sm">FREE NEET Rank Predictor</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-ark-white mb-6 leading-tight max-w-4xl mx-auto">
                    Predict Your NEET Rank, State Position & <span className="text-ark-yellow">Govt Seat Chances</span> Instantly
                  </h1>
                  <p className="text-ark-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Based on your 12th marks + expected NEET score.
                  </p>
                  <button
                    onClick={() => setStep('academic')}
                    className="btn-primary w-full sm:w-auto text-lg px-10 py-4 inline-flex items-center justify-center gap-3"
                  >
                    🎯 Start My Prediction
                    <FaArrowRight />
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* STEP 1 — Academic Input */}
          {step === 'academic' && (
            <motion.section
              key="academic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="py-16 md:py-24 bg-secondary min-h-[80vh] flex items-center"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">Step 1 of 2</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">Enter Your Academic Details</h2>
                  </div>
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(['physics', 'chemistry', 'biology'] as const).map((sub) => (
                        <div key={sub}>
                          <label className={labelClass}>12th {sub.charAt(0).toUpperCase() + sub.slice(1)} Marks</label>
                          <input
                            type="number" min={0} max={100} placeholder="Out of 100"
                            className={inputClass}
                            value={academicInput[sub] || ''}
                            onChange={(e) => setAcademicInput(p => ({ ...p, [sub]: Number(e.target.value) }))}
                          />
                          {errors[sub] && <p className={errorClass}>{errors[sub]}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Board</label>
                        <select className={selectClass} value={academicInput.board} onChange={e => setAcademicInput(p => ({ ...p, board: e.target.value }))}>
                          <option value="">Select Board</option>
                          {boards.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        {errors.board && <p className={errorClass}>{errors.board}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Attempt</label>
                        <select className={selectClass} value={academicInput.attempt} onChange={e => setAcademicInput(p => ({ ...p, attempt: e.target.value }))}>
                          <option value="">Select Attempt</option>
                          {attempts.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        {errors.attempt && <p className={errorClass}>{errors.attempt}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Expected NEET Score <span className="text-muted-foreground font-normal">(optional)</span></label>
                      <input
                        type="number" min={0} max={720} placeholder="If you already have an estimate"
                        className={inputClass}
                        value={academicInput.expectedScore || ''}
                        onChange={(e) => setAcademicInput(p => ({ ...p, expectedScore: e.target.value ? Number(e.target.value) : undefined }))}
                      />
                      {errors.expectedScore && <p className={errorClass}>{errors.expectedScore}</p>}
                    </div>
                    <button onClick={handleAcademicSubmit} className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-3">
                      🎯 Continue to Prediction <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* STEP 2 — Lead Capture */}
          {step === 'lead' && (
            <motion.section
              key="lead"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="py-16 md:py-24 bg-secondary min-h-[80vh] flex items-center"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">Step 2 of 2</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">Your Rank Analysis Is Ready</h2>
                    <p className="text-muted-foreground mt-2">Enter details to unlock full report.</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Student Name</label>
                        <input className={inputClass} placeholder="Full name" value={leadInfo.studentName} onChange={e => setLeadInfo(p => ({ ...p, studentName: e.target.value }))} />
                        {errors.studentName && <p className={errorClass}>{errors.studentName}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Parent Name</label>
                        <input className={inputClass} placeholder="Parent/Guardian name" value={leadInfo.parentName} onChange={e => setLeadInfo(p => ({ ...p, parentName: e.target.value }))} />
                        {errors.parentName && <p className={errorClass}>{errors.parentName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Phone <span className="text-destructive">*</span></label>
                        <input className={inputClass} type="tel" placeholder="+91 XXXXX XXXXX" value={leadInfo.phone} onChange={e => setLeadInfo(p => ({ ...p, phone: e.target.value }))} />
                        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Email <span className="text-destructive">*</span></label>
                        <input className={inputClass} type="email" placeholder="student@email.com" value={leadInfo.email} onChange={e => setLeadInfo(p => ({ ...p, email: e.target.value }))} />
                        {errors.email && <p className={errorClass}>{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>State</label>
                        <select className={selectClass} value={leadInfo.state} onChange={e => setLeadInfo(p => ({ ...p, state: e.target.value }))}>
                          <option value="">Select State</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p className={errorClass}>{errors.state}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <select className={selectClass} value={leadInfo.category} onChange={e => setLeadInfo(p => ({ ...p, category: e.target.value }))}>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.category && <p className={errorClass}>{errors.category}</p>}
                      </div>
                    </div>
                    <button onClick={handleLeadSubmit} className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-3">
                      🎯 Unlock My Rank & Risk Report <FaArrowRight />
                    </button>
                    <button onClick={() => setStep('academic')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                      ← Back to Academic Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* STEP 3 — Results */}
          {step === 'result' && displayResult && (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="py-12 md:py-20 bg-secondary"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-ark-yellow/20 text-ark-yellow px-4 py-2 rounded-full mb-4">
                      <HiCheckCircle />
                      <span className="font-semibold text-sm">Report Generated</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Your NEET Prediction Report
                    </h2>
                    <p className="text-muted-foreground mt-1">Hi {leadInfo.studentName}, here's your personalized analysis</p>
                  </div>

                  {/* Result Cards Grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Predicted Score */}
                    <ResultCard
                      icon={<FaChartLine className="text-ark-yellow text-xl" />}
                      title="Predicted NEET Potential"
                      value={`${displayResult.scoreRange[0]} – ${displayResult.scoreRange[1]}`}
                      subtitle={`Base Score: ${displayResult.predictedScore} / 720`}
                      accent
                    />

                    {/* AIR */}
                    <ResultCard
                      icon={<HiSparkles className="text-ark-yellow text-xl" />}
                      title="Predicted All India Rank"
                      value={`${displayResult.airRange[0].toLocaleString()} – ${displayResult.airRange[1].toLocaleString()}`}
                      subtitle="Based on historical NEET data"
                    />

                    {/* State Rank */}
                    <ResultCard
                      icon={<FaMapMarkerAlt className="text-ark-yellow text-xl" />}
                      title={`${leadInfo.state} State Rank`}
                      value={`${displayResult.stateRankRange[0].toLocaleString()} – ${displayResult.stateRankRange[1].toLocaleString()}`}
                      subtitle="Estimated state-level position"
                    />

                    {/* Govt Seat Probability */}
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-ark-blue flex items-center justify-center">
                          <FaUniversity className="text-ark-white" />
                        </div>
                        <h3 className="font-bold text-foreground">Govt Seat Probability</h3>
                      </div>
                      <div className="space-y-4">
                        <ProbabilityBar label="Government Seat" value={displayResult.govtProbability} />
                        <ProbabilityBar label="AIQ Probability" value={displayResult.aiqProbability} />
                      </div>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className={`rounded-2xl p-6 ${displayResult.riskLevel === 'Low' ? 'bg-green-50 border border-green-200' :
                    displayResult.riskLevel === 'Moderate' ? 'bg-amber-50 border border-amber-200' :
                      'bg-red-50 border border-red-200'
                    }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FaShieldAlt className={`text-xl ${displayResult.riskLevel === 'Low' ? 'text-green-600' :
                        displayResult.riskLevel === 'Moderate' ? 'text-amber-600' :
                          'text-red-600'
                        }`} />
                      <h3 className="font-bold text-foreground">Risk Analysis: <span className={
                        displayResult.riskLevel === 'Low' ? 'text-green-600' :
                          displayResult.riskLevel === 'Moderate' ? 'text-amber-600' :
                            'text-red-600'
                      }>{displayResult.riskLevel} Risk</span></h3>
                    </div>
                    <p className="text-foreground/80 mb-2">{displayResult.riskMessage}</p>
                    <p className="text-sm text-muted-foreground">💡 {displayResult.improvementTip}</p>
                  </div>

                  {/* Score Improvement Simulator */}
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-ark-yellow flex items-center justify-center">
                        <FaSlidersH className="text-ark-blue" />
                      </div>
                      <h3 className="font-bold text-foreground">Score Improvement Simulator</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">What if I improve by +{improvement} marks?</p>
                    <input
                      type="range" min={0} max={100} step={5}
                      value={improvement}
                      onChange={(e) => handleImprovement(Number(e.target.value))}
                      className="w-full accent-ark-yellow h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>+0</span><span>+50</span><span>+100</span>
                    </div>
                    {improvedResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 bg-ark-yellow/10 rounded-xl"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          With +{improvement} marks: AIR {improvedResult.airRange[0].toLocaleString()} – {improvedResult.airRange[1].toLocaleString()} | Govt Seat: {improvedResult.govtProbability}%
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="gradient-hero rounded-2xl p-8 text-center space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-ark-white">
                      Want Expert Guidance on Your Score?
                    </h3>
                    <p className="text-ark-white/70 text-sm max-w-lg mx-auto">
                      Book a free 15-min strategy call with our NEET mentors
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => window.open(whatsappURL, '_blank', 'noopener,noreferrer')}
                        className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3"
                      >
                        <FaWhatsapp className="text-lg" />
                        Book Free Strategy Call
                      </button>
                      <a href={`tel:+91${phoneNumber.slice(2)}`} className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3">
                        <FaPhoneAlt />
                        Call Us Now
                      </a>
                    </div>
                  </div>

                  {/* Restart */}
                  <div className="text-center">
                    <button onClick={() => { setStep('hero'); setResult(null); setImprovedResult(null); setImprovement(0); webhookSentRef.current = false; }} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
                      Start a New Prediction
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
};

// Sub-components
const ResultCard = ({ icon, title, value, subtitle, accent }: { icon: React.ReactNode; title: string; value: string; subtitle: string; accent?: boolean }) => (
  <div className={`rounded-2xl p-6 shadow-card ${accent ? 'bg-ark-blue text-ark-white' : 'bg-card'}`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent ? 'bg-ark-yellow' : 'bg-ark-blue'}`}>
        {icon}
      </div>
      <h3 className={`font-bold ${accent ? 'text-ark-white' : 'text-foreground'}`}>{title}</h3>
    </div>
    <p className={`text-2xl md:text-3xl font-bold mb-1 ${accent ? 'text-ark-yellow' : 'text-foreground'}`}>{value}</p>
    <p className={`text-sm ${accent ? 'text-ark-white/70' : 'text-muted-foreground'}`}>{subtitle}</p>
    {accent && (
      <p className="text-xs text-ark-yellow/80 mt-2">
        Improvement Potential: +35 marks possible with structured revision
      </p>
    )}
  </div>
);

const ProbabilityBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-foreground font-medium">{label}</span>
      <span className="text-ark-yellow font-bold">{value}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full rounded-full ${value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-ark-yellow' : 'bg-red-400'
          }`}
      />
    </div>
  </div>
);

export default NEETPredictor;
