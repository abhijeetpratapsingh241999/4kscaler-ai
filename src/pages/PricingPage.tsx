import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PlanCard from '../components/pricing/PlanCard';
import ComparePlansTable from '../components/pricing/ComparePlansTable';
import { plans } from '../data/plans'; // Data ko nayi file se import kar rahe hain

// TypeScript types
type PlanInterval = 'monthly' | 'yearly';
type FAQItemProps = { question: string; children: React.ReactNode; };

// FAQ Item Component
const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-lg">
      <button onClick={() => setIsOpen(!isOpen)} className="faq-question w-full flex justify-between items-center p-4 text-left font-semibold" aria-expanded={isOpen}>
        <span>{question}</span>
        <svg className={`faq-arrow w-5 h-5 transition-transform ${isOpen ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div className={`faq-answer px-4 text-text-secondary-light dark:text-text-secondary-dark ${isOpen ? 'open' : ''}`}><div className="py-2">{children}</div></div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const [planInterval, setPlanInterval] = useState<PlanInterval>('monthly');

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
          Unlock the power of 4kscaler-ai
        </h1>
        <div id="plan-toggle-container" className="mt-6 p-1 bg-gray-200 dark:bg-gray-800 rounded-full inline-flex items-center space-x-1">
          <button onClick={() => setPlanInterval('monthly')} className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${planInterval === 'monthly' ? 'active' : ''}`}>Monthly</button>
          <button onClick={() => setPlanInterval('yearly')} className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${planInterval === 'yearly' ? 'active' : ''}`}>Yearly</button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} planInterval={planInterval} />
        ))}
      </div>

      {/* Compare Plans Table */}
      <ComparePlansTable planInterval={planInterval} />

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem question="What payment methods do you accept?">We accept all major credit cards and PayPal.</FAQItem>
          <FAQItem question="Can I cancel my subscription anytime?">Yes, you can cancel your subscription at any time.</FAQItem>
        </div>
      </div>
    </PageContainer>
  );
};

export default PricingPage;
