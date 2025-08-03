import React from 'react';
import PageContainer from '../layout/PageContainer'; // PageContainer yahan add kiya gaya hai
import { SparklesIcon, ShieldCheckIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const FeaturesSection: React.FC = () => {
  return (
    // Ab FeaturesSection apne content ko PageContainer ke andar rakhta hai
    <div className="bg-background-light dark:bg-background-dark py-16 sm:py-24">
      <PageContainer>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose 4kscaler-ai?</h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-2">
            The most advanced AI for unparalleled video quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-lg flex items-center justify-center"><SparklesIcon className="w-8 h-8 text-blue-500" /></div>
            <h3 className="text-xl font-semibold mb-2">Stunning Quality</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Our AI models are trained to upscale videos to 8K with incredible detail and clarity.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-lg flex items-center justify-center"><ShieldCheckIcon className="w-8 h-8 text-green-500" /></div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Your files are encrypted and processed securely. We respect your privacy.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-lg flex items-center justify-center"><CodeBracketIcon className="w-8 h-8 text-purple-500" /></div>
            <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Integrate our powerful API into your own applications with just a few lines of code.</p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default FeaturesSection;
