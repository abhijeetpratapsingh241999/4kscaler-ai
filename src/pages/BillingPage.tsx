import React, { useEffect, useRef } from 'react';
import PageContainer from '../components/layout/PageContainer';

// Placeholder data for billing history
const billingHistory = [
  { date: 'Jul 28, 2025', desc: 'Pro Plan Subscription', amount: '₹1999.00' },
  { date: 'Jun 28, 2025', desc: 'Pro Plan Subscription', amount: '₹1999.00' },
  { date: 'Jun 15, 2025', desc: '100 Credits Pack', amount: '₹249.00' },
];

// Placeholder data for credit packs
const creditPacks = [
  { name: 'Starter Pack', credits: 100, price: '₹249' },
  { name: 'Creator Pack', credits: 500, price: '₹999' },
];

const BillingPage: React.FC = () => {
    const progressCircleRef = useRef<SVGCircleElement>(null);

    // Credit usage progress ring ke liye animation effect
    useEffect(() => {
        const circle = progressCircleRef.current;
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const usedPercentage = 75; // Example percentage (375/500)

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            
            // Animation ko trigger karne ke liye
            setTimeout(() => {
                const offset = circumference - (usedPercentage / 100) * circumference;
                circle.style.strokeDashoffset = `${offset}`;
            }, 100);
        }
    }, []);

    return (
        <PageContainer>
            {/* Background animated gradient */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] [mask-image:radial-gradient(circle,white,transparent_80%)]">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_90deg_at_40%_50%,#3b82f6,20%,#8b5cf6_40%,#ec4899_60%,#f472b6_80%,#3b82f6)] animate-[spin_25s_linear_infinite]"></div>
            </div>
            
            <div className="relative z-10">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Billing & Plans</h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">Manage your subscription, purchase credits, and view your payment history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Plan Overview Card */}
                        <div className="plan-overview-card flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative flex-shrink-0">
                                <svg className="w-40 h-40" viewBox="0 0 100 100">
                                    <circle className="text-gray-200 dark:text-gray-700/50" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50"></circle>
                                    <circle ref={progressCircleRef} className="plan-progress-ring__circle text-primary-color" strokeWidth="8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" style={{ strokeDashoffset: 264 }}></circle>
                                    <text x="50" y="50" fontFamily="Poppins, sans-serif" fontSize="24" dy=".3em" fontWeight="bold" textAnchor="middle" className="fill-current text-text-main-light dark:text-text-main-dark">75%</text>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Pro Plan</h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 font-semibold">375 / 500 credits used</p>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-4">Your plan renews on August 28, 2025.</p>
                                <div className="flex gap-4 mt-6">
                                    <button className="bubble-button text-white font-semibold py-2 px-5 rounded-lg text-sm">Upgrade Plan</button>
                                    <button className="px-5 py-2 text-sm font-semibold rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">Cancel</button>
                                </div>
                            </div>
                        </div>

                        {/* Credit Purchase Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Need More Credits?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {creditPacks.map(pack => (
                                    <div key={pack.name} className="credit-pack-card text-center">
                                        <p className="text-lg font-semibold text-text-secondary-light dark:text-text-secondary-dark">{pack.name}</p>
                                        <p className="text-4xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{pack.credits}</p>
                                        <p className="font-semibold text-xl mb-4">Credits</p>
                                        <button className="w-full bubble-button text-white font-bold py-2 px-4 rounded-lg">Buy for {pack.price}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Payment History Card */}
                        <div className="glass-effect p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="billing-history-table min-w-full">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th className="text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billingHistory.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-sm">{item.date}</td>
                                                <td>{item.desc}</td>
                                                <td className="text-right font-mono">{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default BillingPage;
