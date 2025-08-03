import React from 'react';
import { CheckIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/solid';
import { Plan } from '../../data/plans'; // Plan type ko data file se import kar rahe hain

type PlanCardProps = {
  plan: Plan;
  planInterval: 'monthly' | 'yearly';
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, planInterval }) => {
  return (
    <div className={`plan-card p-6 flex flex-col ${plan.isPopular ? 'popular' : ''}`}>
      {plan.isPopular && (
        <div className="popular-badge-container">
          <div className="popular-badge text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <StarIcon className="w-4 h-4" /> Most Popular
          </div>
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? 'pt-4' : ''}`}>{plan.name}</h3>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">{plan.desc}</p>
      <p className="text-4xl font-bold mb-4">
        {plan.price[planInterval]}
        {plan.name !== 'Enterprise' && <span className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">/{planInterval === 'monthly' ? 'month' : 'year'}</span>}
      </p>
      <button className={`w-full py-2 px-4 rounded-lg font-semibold transition ${plan.name === 'Free' ? 'bg-gray-600 text-white cursor-not-allowed' : 'bubble-button text-white'}`}>
        {plan.buttonText}
      </button>
      <ul className="space-y-3 mt-6 text-sm flex-grow">
        {plan.credits && (
          <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" />{plan.credits[planInterval]}</li>
        )}
        {plan.features.map((feature, fIndex) => (
          <li key={fIndex} className="flex items-center gap-3">
            {feature.included ? <CheckIcon className="w-5 h-5 text-green-500" /> : <XMarkIcon className="w-5 h-5 text-red-500" />}
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
