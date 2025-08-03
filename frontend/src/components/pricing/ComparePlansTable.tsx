import React from 'react';

type ComparePlansTableProps = {
  planInterval: 'monthly' | 'yearly';
};

const ComparePlansTable: React.FC<ComparePlansTableProps> = ({ planInterval }) => {
  // Data ko yahan alag se manage kar sakte hain
  const prices = {
    free: { monthly: '₹0', yearly: '₹0' },
    beta: { monthly: '₹499', yearly: '₹4,990' },
    pro: { monthly: '₹1999', yearly: '₹19,990' },
    enterprise: { monthly: 'Custom', yearly: 'Custom' },
  };

  const credits = {
    beta: { monthly: '100 / month', yearly: '1200 / year' },
    pro: { monthly: '500 / month', yearly: '6000 / year' },
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
      <div className="overflow-x-auto no-scrollbar md:overflow-visible">
        <table className="w-full text-left min-w-[640px] lg:min-w-full">
          <caption className="sr-only">Comparison of all available plans</caption>
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th scope="col" className="p-4 font-semibold">Feature</th>
              <th scope="col" className="p-4 font-semibold text-center">Free</th>
              <th scope="col" className="p-4 font-semibold text-center">Beta</th>
              <th scope="col" className="p-4 font-semibold text-center">Baap</th>
              <th scope="col" className="p-4 font-semibold text-center">Guru</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 dark:divide-white/10">
            <tr>
              <th scope="row" className="p-4 font-semibold text-left">Price</th>
              <td className="p-4 text-center">{prices.free[planInterval]}</td>
              <td className="p-4 text-center">{prices.beta[planInterval]}</td>
              <td className="p-4 text-center">{prices.pro[planInterval]}</td>
              <td className="p-4 text-center">{prices.enterprise[planInterval]}</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-left">Max Resolution</th>
              <td className="p-4 text-center">1080p</td>
              <td className="p-4 text-center">4K</td>
              <td className="p-4 text-center">8K</td>
              <td className="p-4 text-center">8K+</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-left">Credits</th>
              <td className="p-4 text-center">10 / month</td>
              <td className="p-4 text-center">{credits.beta[planInterval]}</td>
              <td className="p-4 text-center">{credits.pro[planInterval]}</td>
              <td className="p-4 text-center">Custom</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-left">Watermark</th>
              <td className="p-4 text-center text-green-500">✔️</td>
              <td className="p-4 text-center text-red-500">❌</td>
              <td className="p-4 text-center text-red-500">❌</td>
              <td className="p-4 text-center text-red-500">❌</td>
            </tr>
            <tr>
              <th scope="row" className="p-4 font-semibold text-left">API Access</th>
              <td className="p-4 text-center text-red-500">❌</td>
              <td className="p-4 text-center text-red-500">❌</td>
              <td className="p-4 text-center text-green-500">✔️</td>
              <td className="p-4 text-center text-green-500">✔️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePlansTable;
