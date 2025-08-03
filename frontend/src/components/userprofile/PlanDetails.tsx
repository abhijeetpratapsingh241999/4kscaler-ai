import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

const PlanDetails: React.FC = () => {
  // Sample data for display.
  const plan = {
    name: 'Pro Plan',
    features: [
      'Up to 4K Video Upscaling',
      '60 FPS Frame Interpolation',
      'Advanced AI Color Grading',
      '5,000 AI Credits per month',
      'Priority Support',
    ],
    renewalDate: 'August 20, 2025',
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white text-shadow-glow">Your Current Plan</h3>
        <span className="flex items-center gap-2 text-sm font-semibold text-cyan-300 plan-badge">
          <Zap size={16} />
          {plan.name}
        </span>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 size={18} className="text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-400">
          Your plan renews on {plan.renewalDate}.
        </p>
        <button className="manage-plan-button">
          Manage Plan
        </button>
      </div>
    </div>
  );
};

export default PlanDetails;
