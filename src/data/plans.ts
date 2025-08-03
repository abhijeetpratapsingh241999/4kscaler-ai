// Plan data ke liye TypeScript type define kar rahe hain
export type Plan = {
  name: string;
  desc: string;
  price: { monthly: string; yearly: string };
  credits?: { monthly: string; yearly: string };
  buttonText: string;
  isPopular: boolean;
  features: { text: string; included: boolean }[];
};

// Pricing plans ka saara data ab is file mein hai
export const plans: Plan[] = [
    { 
        name: 'Free', 
        desc: 'Perfect for getting started', 
        price: { monthly: '₹0', yearly: '₹0' }, 
        buttonText: 'Current Plan', 
        isPopular: false, 
        features: [ 
            { text: '1080p Upscaling', included: true }, 
            { text: '10 credits/month', included: true }, 
            { text: 'Max 30s video', included: true }, 
            { text: 'Watermark on output', included: false }, 
            { text: 'API Access', included: false }, 
        ] 
    },
    { 
        name: 'Beta', 
        desc: 'For hobbyists and creators', 
        price: { monthly: '₹499', yearly: '₹4,990' }, 
        credits: { monthly: '100 credits/month', yearly: '1200 credits/year' }, 
        buttonText: 'Upgrade', 
        isPopular: false, 
        features: [ 
            { text: 'Up to 4K Upscaling', included: true }, 
            { text: 'No Watermark', included: true }, 
            { text: 'Max 2 min video', included: true }, 
            { text: 'API Access', included: false }, 
        ] 
    },
    { 
        name: 'Baap', 
        desc: 'For professionals and power users', 
        price: { monthly: '₹1999', yearly: '₹19,990' }, 
        credits: { monthly: '500 credits/month', yearly: '6000 credits/year' }, 
        buttonText: 'Upgrade', 
        isPopular: true, 
        features: [ 
            { text: 'Up to 8K Upscaling', included: true }, 
            { text: 'No Watermark', included: true }, 
            { text: 'Max 10 min video', included: true }, 
            { text: 'API Access', included: true }, 
        ] 
    },
    { 
        name: 'Guru', 
        desc: 'For businesses and teams', 
        price: { monthly: 'Custom', yearly: 'Custom' }, 
        buttonText: 'Contact Us', 
        isPopular: false, 
        features: [ 
            { text: 'Everything in Pro plan', included: true }, 
            { text: 'Custom Credit Limits', included: true }, 
            { text: 'Dedicated Support', included: true }, 
            { text: 'Team Management', included: true }, 
            { text: 'Custom Integrations', included: true }, 
        ] 
    }
];
