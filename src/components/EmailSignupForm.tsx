import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaBook } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import { API_BASE_URL } from '../config/api';

interface EmailSignupFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  variant?: 'default' | 'minimal';
}

const EmailSignupForm = ({
  title = "Get Your FREE NEET Success Kit",
  subtitle = "Enter your details below to unlock all 6 booklets + personalized study guide",
  buttonText = "Get My Free Kit Now",
  variant = 'default'
}: EmailSignupFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gather form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string || 'Student'; // Default for minimal variant
    const userClass = formData.get('class') as string || 'unknown';

    if (!email) return;

    // Instant Success (Optimistic UI)
    setIsSubmitted(true);

    // Fire & Forget API call
    try {
      fetch(`${API_BASE_URL}/api/leads/free-kit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, class: userClass })
      }).catch(err => console.error("Lead API error:", err));
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-secondary focus:outline-none focus:ring-2 focus:ring-ark-yellow text-sm"
            required
          />
          <button
            type="submit"
            className="bg-ark-yellow text-ark-blue font-bold py-2 px-4 rounded-lg hover:bg-ark-yellow/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Get It Free
            <FaArrowRight className="text-xs" />
          </button>
        </form>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <FaCheckCircle className="text-ark-yellow text-sm" />
          <span>No spam ever</span>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-ark-white rounded-2xl p-8 shadow-elevated border-2 border-ark-yellow/30"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2 text-center flex items-center justify-center gap-2">
        <FaBook className="text-ark-yellow" />
        <span>{title}</span>
      </h3>
      <p className="text-center text-muted-foreground mb-6">
        {subtitle}
      </p>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block text-ark-yellow text-6xl mb-4"
          >
            <FaCheckCircle />
          </motion.div>
          <h4 className="text-2xl font-bold text-foreground mb-2">
            Request Received
          </h4>
          <p className="text-muted-foreground text-lg">
            Check your email for the Free NEET Kit.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="px-4 py-3 rounded-lg border border-border bg-secondary focus:outline-none focus:ring-2 focus:ring-ark-yellow"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="px-4 py-3 rounded-lg border border-border bg-secondary focus:outline-none focus:ring-2 focus:ring-ark-yellow"
              required
            />
          </div>

          <select
            name="class"
            className="w-full px-4 py-3 rounded-lg border border-border bg-secondary focus:outline-none focus:ring-2 focus:ring-ark-yellow"
            defaultValue=""
            required
          >
            <option value="">Select Your Class</option>
            <option value="class-11">Class 11 (Fresh Start)</option>
            <option value="class-12">Class 12 (Final Year)</option>
            <option value="dropper">Dropper/Repeater</option>
          </select>

          <button
            type="submit"
            className="w-full bg-ark-yellow text-ark-blue font-bold py-3 px-6 rounded-lg hover:bg-ark-yellow/90 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <FaArrowRight /> {buttonText}
          </button>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <FaCheckCircle className="text-ark-yellow text-sm" />
            <span>No spam — just resources. Unsubscribe anytime.</span>
          </p>
        </form>
      )}
    </motion.div>
  );
};

export default EmailSignupForm;
