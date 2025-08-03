import React from 'react';

// --- FeatureCard Component ---
// This component is now part of the file to make it complete.

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
  cardClass?: string;
  iconContainerClass?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  isNew,
  cardClass = "bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg",
  iconContainerClass = ""
}) => {
  return (
    <div className={`relative ${cardClass}`}>
      {isNew && (
        <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          NEW
        </span>
      )}
      {/* Icon container radius increased */}
      <div className={`flex items-center justify-center h-12 w-12 rounded-xl mb-5 ${iconContainerClass}`}>
        {icon}
      </div>
      {/* Custom classes added for better CSS control */}
      <h3 className="text-lg font-semibold card-title mb-2">{title}</h3>
      <p className="text-sm leading-relaxed card-description">{description}</p>
    </div>
  );
};


// --- Placeholder Icons ---
const IconAudio = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 8.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zM19 19l-4-4" /></svg>;
const IconFace = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Icon4K = () => <span className="text-xl font-bold">4K</span>;
const Icon60FPS = () => <span className="text-xl font-bold">60</span>;
const IconColor = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const IconDenoise = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>;

// --- Data for the feature cards ---
const featuresData = [
  {
    icon: <IconAudio />,
    title: "AI Audio Restoration",
    description: "Remove background noise and make the audio crystal clear in any video.",
    isNew: true,
    glowClass: "icon-audio-glow",
  },
  {
    icon: <IconFace />,
    title: "AI Face Enhancement",
    description: "Automatically detect and enhance faces, making them sharper and clearer.",
    glowClass: "icon-face-glow",
  },
  {
    icon: <Icon4K />,
    title: "AI Upscaling",
    description: "Upscale your old and low-quality videos to stunning 4K resolution.",
    glowClass: "icon-upscale-glow",
  },
  {
    icon: <Icon60FPS />,
    title: "AI Frame Interpolation",
    description: "Add new frames to your video, making it ultra-smooth up to 60 FPS.",
    glowClass: "icon-fps-glow",
  },
  {
    icon: <IconColor />,
    title: "AI Color Grading",
    description: "Give your videos a cinematic color and look with just a single click.",
    glowClass: "icon-color-glow",
  },
  {
    icon: <IconDenoise />,
    title: "Denoising + Artifact Removal",
    description: "Clean your videos by removing grains, noise, and compression artifacts.",
    glowClass: "icon-denoise-glow",
  },
];

// --- Main FeatureHub Component ---
export const FeatureHub = () => {
  return (
    <>
      <style>
        {`
          /* Styles for "Not Just a Tool, Your" */
          .hero-text-primary {
            color: #020617; /* Default black-ish color */
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
          
          /* Styles for "AI Video Studio" */
          .hero-text-secondary {
            background: linear-gradient(90deg, #ff3b3b, #00ff87, #ff3b3b);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            animation: text-gradient-move 4s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(255, 59, 59, 0.6)) 
                    drop-shadow(0 0 20px rgba(0, 255, 135, 0.5));
          }

          /* Dark Mode Overrides */
          .dark .hero-text-primary {
            color: #ffffff;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
          }

          /* Animation Keyframes */
          @keyframes text-gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Light Mode Styles for Feature Cards */
          .feature-card {
            background: rgba(239, 246, 255, 0.6); /* Very Light Blue with transparency */
            backdrop-filter: blur(16px); /* Increased blur */
            -webkit-backdrop-filter: blur(16px);
            border-radius: 1.5rem; 
            border: 1px solid rgba(0, 0, 0, 0.1); /* Very light black border */
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); /* Adjusted shadow */
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.15);
            border-color: rgba(0, 0, 0, 0.15); /* Slightly darker on hover */
          }
          
          /* Dark Mode Styles for Feature Cards */
          .dark .feature-card {
            background: rgba(41, 51, 71, 0.25); /* Original dark mode background */
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
          }

          .dark .feature-card:hover {
            box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.3);
          }

          /* Card Text Styles - Light Mode (Default) */
          .card-title {
            color: #1a1a1a; /* Metallic Black */
            text-shadow: 0 0 6px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .card-description {
            color: #333333;
            text-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
          }

          /* Card Text Styles - Dark Mode */
          .dark .card-title {
            color: #ffffff;
            text-shadow: none;
          }
          .dark .card-description {
            color: #d1d5db; /* slate-300 */
            text-shadow: none;
          }

          /* Icon Glow Effects - Light Mode (Default) */
          .icon-audio-glow svg { color: #22d3ee; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 0 6px rgba(34, 211, 238, 0.7)) drop-shadow(0 0 15px rgba(34, 211, 238, 0.5)); }
          .icon-face-glow svg { color: #ec4899; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 0 6px rgba(236, 72, 153, 0.7)) drop-shadow(0 0 15px rgba(236, 72, 153, 0.5)); }
          .icon-upscale-glow span { color: #818cf8; text-shadow: 0 1px 2px rgba(0,0,0,0.15), 0 0 6px rgba(129, 140, 248, 0.7), 0 0 15px rgba(129, 140, 248, 0.5); }
          .icon-fps-glow span { color: #94a3b8; text-shadow: 0 1px 2px rgba(0,0,0,0.15), 0 0 6px rgba(148, 163, 184, 0.7), 0 0 15px rgba(148, 163, 184, 0.5); }
          .icon-color-glow svg { color: #34d399; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 0 6px rgba(52, 211, 153, 0.7)) drop-shadow(0 0 15px rgba(52, 211, 153, 0.5)); }
          .icon-denoise-glow svg { color: #f59e0b; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 0 6px rgba(245, 158, 11, 0.7)) drop-shadow(0 0 15px rgba(245, 158, 11, 0.5)); }

          /* Icon Glow Effects - Dark Mode */
          .dark .icon-audio-glow svg { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.7)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.5)); }
          .dark .icon-face-glow svg { filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.7)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.5)); }
          .dark .icon-upscale-glow span { text-shadow: 0 0 8px rgba(129, 140, 248, 0.7), 0 0 20px rgba(129, 140, 248, 0.5); }
          .dark .icon-fps-glow span { text-shadow: 0 0 8px rgba(148, 163, 184, 0.7), 0 0 20px rgba(148, 163, 184, 0.5); }
          .dark .icon-color-glow svg { filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.7)) drop-shadow(0 0 20px rgba(52, 211, 153, 0.5)); }
          .dark .icon-denoise-glow svg { filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.7)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.5)); }
        `}
      </style>
      <section className="font-poppins py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="hero-text-primary">
                Not Just a Tool, Your{' '}
              </span>
              <span className="hero-text-secondary">
                AI Video Studio
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
              Explore our powerful AI capabilities that take your videos to a whole new level.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isNew={feature.isNew}
                cardClass="feature-card p-6" // Applying the new card style
                iconContainerClass={feature.glowClass} // Applying the new icon glow
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
