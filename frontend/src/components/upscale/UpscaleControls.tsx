import React, { useState, useRef, useEffect } from 'react';
import { CloudArrowUpIcon, SparklesIcon, ChevronDownIcon, ClockIcon, ArrowsPointingOutIcon, Cog6ToothIcon, Square3Stack3DIcon, UserCircleIcon, SpeakerWaveIcon, StarIcon } from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid, BoltIcon } from '@heroicons/react/24/solid';
import { useApp } from '../../contexts/AppContext';

type UpscaleControlsProps = {
  onFileSelect: (file: File) => void;
};

// --- Custom Switch Component ---
const CustomSwitch = ({ isOn, handleToggle, theme }) => {
    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none ${
                isOn ? 'bg-blue-600' : theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
                    isOn ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};

// --- Custom Dropdown Component ---
const CustomDropdown = ({ label, options, selected, setSelected, popupPosition = 'right', icon, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const popupClasses = popupPosition === 'left' 
        ? 'right-full mr-2' 
        : 'left-full ml-2';

    // Helper function to get style for resolution options
    const getResolutionStyle = (res) => {
        if (theme !== 'dark') {
            switch (res) {
                case '1080p': return 'text-green-600 font-medium';
                case '2K': return 'text-blue-600 font-medium';
                case '4K': return 'text-purple-600 font-medium';
                case '8K': return 'text-red-600 font-medium';
                default: return 'text-black';
            }
        }
        switch (res) {
            case '1080p':
                return 'text-green-400 [text-shadow:0_0_2px_#4ade80,0_0_8px_#22c55e,0_0_12px_#16a34a]';
            case '2K':
                return 'text-blue-400 [text-shadow:0_0_2px_#60a5fa,0_0_8px_#3b82f6,0_0_12px_#2563eb]';
            case '4K':
                return 'text-purple-400 [text-shadow:0_0_2px_#c084fc,0_0_8px_#a855f7,0_0_12px_#9333ea]';
            case '8K':
                return 'text-red-500 [text-shadow:0_0_2px_#f87171,0_0_8px_#ef4444,0_0_12px_#dc2626]';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="relative w-1/2" ref={dropdownRef}>
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <label className="block text-sm font-medium">{label}:</label>
            </div>
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className={`w-full flex items-center justify-between p-2 bg-background-light dark:bg-background-dark rounded-lg outline-none ${
                    theme === 'light' ? 'shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'border border-white/10'
                }`}
            >
                <span className="text-sm">{selected}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className={`absolute z-20 top-0 w-40 rounded-lg p-2 ${popupClasses} ${
                    theme === 'light' 
                    ? 'metallic-light' 
                    : 'glass-effect border border-white/10'
                }`}>
                    {options.map(option => {
                        const isDurationOption = typeof option === 'object' && option !== null && 'label' in option;
                        const key = isDurationOption ? option.label : option;
                        const displayLabel = isDurationOption ? option.label : option;

                        return (
                            <button 
                                key={key}
                                onClick={() => {
                                    setSelected(displayLabel);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left p-2 text-sm rounded hover:bg-white/10 dark:hover:bg-black/20 flex items-center justify-between"
                            >
                                {label === 'Duration' && isDurationOption ? (
                                    <>
                                        <span className={`${theme === 'dark' ? 'text-white [text-shadow:0_0_2px_#fff,0_0_10px_#a78bfa,0_0_15px_#a78bfa]' : 'text-black'}`}>
                                            {displayLabel}
                                        </span>
                                        <div className={`flex items-center gap-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                            <BoltIcon className="w-4 h-4 text-yellow-400 [filter:drop-shadow(0_0_4px_#facc15)]" />
                                            <span className="text-xs opacity-90">
                                                - {option.credit}
                                            </span>
                                        </div>
                                    </>
                                ) : label === 'Resolution' ? (
                                    <span className={getResolutionStyle(displayLabel)}>
                                        {displayLabel}
                                    </span>
                                ) : (
                                    <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{displayLabel}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// --- Star Particle Animation Component (Dark Mode) ---
const StarParticleAnimation = () => {
  const stars = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
      {stars.map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// --- Universe Animation Component (Light Mode) ---
const UniverseAnimation = () => {
    const particles = Array.from({ length: 15 });
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="universe-particle"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${20 + Math.random() * 30}px`,
                        height: `${20 + Math.random() * 30}px`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    );
};

// --- Type Definition for Advance Feature ---
interface AdvanceFeature {
  id: string;
  label: string;
  credit: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glow: string;
  fpsOptions?: { label: string; credit: number }[];
}

const UpscaleControls: React.FC<UpscaleControlsProps> = ({ onFileSelect }) => {
  const { isLoggedIn, setLoginPopupOpen, theme } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [duration, setDuration] = useState('10s (Free)');
  const [resolution, setResolution] = useState('1080p');
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
  const [advanceFeatures, setAdvanceFeatures] = useState({
    interpolation: 'none', // Tracks fps selection: 'none', '60fps', or '120fps'
    denoising: true,
    faceEnhancement: false,
    audioRestoration: false,
  });

  const durationOptions = [
    { label: '10s (Free)', credit: 0 },
    { label: '1 min', credit: 3 },
    { label: '2 min', credit: 6 },
    { label: '5 min', credit: 15 },
  ];
  const resolutionOptions = ['1080p', '2K', '4K', '8K'];
  const advanceFeatureOptions: AdvanceFeature[] = [
      { 
        id: 'interpolation', 
        label: 'AI Frame Interpolation', 
        credit: 0, // Base credit, updated dynamically based on fps selection
        icon: Square3Stack3DIcon, 
        color: 'text-indigo-400', 
        glow: 'drop-shadow(0 0 2px #818cf8) drop-shadow(0 0 5px #6366f1)',
        fpsOptions: [
          { label: '60fps', credit: 5 },
          { label: '120fps', credit: 8 },
        ]
      },
      { id: 'denoising', label: 'Denoising + Artifact Removal', credit: 3, icon: StarIcon, color: 'text-amber-400', glow: 'drop-shadow(0 0 2px #fcd34d) drop-shadow(0 0 5px #fbbf24)' },
      { id: 'faceEnhancement', label: 'AI Face Enhancement', credit: 4, icon: UserCircleIcon, color: 'text-rose-400', glow: 'drop-shadow(0 0 2px #fb7185) drop-shadow(0 0 5px #f43f5e)' },
      { id: 'audioRestoration', label: 'AI Audio Restoration', credit: 2, icon: SpeakerWaveIcon, color: 'text-emerald-400', glow: 'drop-shadow(0 0 2px #6ee7b7) drop-shadow(0 0 5px #34d399)' },
  ];

  const handleToggleFeature = (featureId) => {
      setAdvanceFeatures(prev => ({ ...prev, [featureId]: !prev[featureId] }));
  };

  const handleFpsSelection = (fps: string) => {
      setAdvanceFeatures(prev => ({ ...prev, interpolation: prev.interpolation === fps ? 'none' : fps }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleGeminiEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setPrompt(prev => `${prev} cinematic lighting, 4k, high detail`);
      setIsEnhancing(false);
    }, 2000);
  };

  const handleUpscale = () => {
    if (!isLoggedIn) {
      setLoginPopupOpen(true);
    } else {
      alert('Upscaling started! (This is a demo)');
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="lg:w-2/5 flex-shrink-0 page-main-container p-6 flex flex-col">
      <style>
        {`
          /* Existing animations */
          @keyframes star-anim {
            0% { transform: scale(0) translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1.5) translateY(-20px); opacity: 0; }
          }
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: #a78bfa; /* violet-400 */
            border-radius: 50%;
            opacity: 0;
            animation: star-anim linear infinite;
            box-shadow: 0 0 5px #a78bfa, 0 0 10px #a78bfa;
          }

          @keyframes universe-anim {
            0% { transform: scale(0.5) translate(0, 0); opacity: 0; }
            50% { opacity: 0.4; }
            100% { transform: scale(1.2) translate(20px, -20px); opacity: 0; }
          }
          .universe-particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            background: radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, rgba(129, 140, 248, 0.3) 100%);
            animation: universe-anim ease-in-out infinite;
          }
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .metallic-light {
            background: linear-gradient(145deg, #e2e8f0, #f8fafc);
            border: 1px solid #cbd5e1;
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.7), inset 0 -1px 1px rgba(0, 0, 0, 0.15);
          }
          @keyframes spin-axis {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-axis {
            animation: spin-axis 4s linear infinite;
          }
          .gemini-btn-loader {
            width: 1rem;
            height: 1rem;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
              to { transform: rotate(360deg); }
          }

          /* --- STYLES FOR UPSCALE BUTTON --- */
          .colorful-glass-button-dark {
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.2));
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          .colorful-glass-button-dark:hover {
            box-shadow: 0 0 20px rgba(192, 132, 252, 0.5), 0 0 30px rgba(236, 72, 153, 0.3);
            transform: translateY(-2px);
          }
          
          .colorful-glass-button-light {
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, #1e3a8a, #4a044e, #0e7490);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            color: white;
          }
          .colorful-glass-button-light:hover {
            box-shadow: 0 0 20px rgba(30, 58, 138, 0.6), 0 0 30px rgba(74, 4, 78, 0.4);
            transform: translateY(-2px);
          }

          .bubble {
            position: absolute;
            border-radius: 50%;
            opacity: 0.7;
            pointer-events: none;
            background: radial-gradient(circle, #8b5cf6, #ec4899, #22d3ee);
            animation: move-bubbles 10s linear infinite;
          }
          .bubble:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 15%; animation-duration: 12s; }
          .bubble:nth-child(2) { width: 40px; height: 40px; top: 70%; left: 80%; animation-duration: 8s; animation-delay: 2s; }
          .bubble:nth-child(3) { width: 60px; height: 60px; top: 50%; left: 40%; animation-duration: 15s; animation-delay: 4s; }
          .bubble:nth-child(4) { width: 30px; height: 30px; top: 20%; left: 90%; animation-duration: 7s; animation-delay: 1s; }

          @keyframes move-bubbles {
            0% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-20px, 30px) scale(1.1); }
            50% { transform: translate(10px, -40px) scale(0.9); }
            75% { transform: translate(30px, 10px) scale(1.2); }
            100% { transform: translate(0, 0) scale(1); }
          }

          @keyframes glowing-wand-icon-dark {
            0% { filter: drop-shadow(0 0 5px #a78bfa); }
            25% { filter: drop-shadow(0 0 7px #ec4899); }
            50% { filter: drop-shadow(0 0 5px #22d3ee); }
            75% { filter: drop-shadow(0 0 7px #facc15); }
            100% { filter: drop-shadow(0 0 5px #a78bfa); }
          }
          .glowing-wand-icon-dark {
            animation: glowing-wand-icon-dark 4s ease-in-out infinite;
          }
          
          @keyframes glowing-wand-icon-light {
            0% { filter: drop-shadow(0 0 8px #ef4444); color: #fca5a5; } /* red */
            25% { filter: drop-shadow(0 0 8px #22c55e); color: #86efac; } /* green */
            50% { filter: drop-shadow(0 0 8px #3b82f6); color: #93c5fd; } /* blue */
            75% { filter: drop-shadow(0 0 8px #f97316); color: #fdba74; } /* orange */
            100% { filter: drop-shadow(0 0 8px #ef4444); color: #fca5a5; } /* red */
          }
          .glowing-wand-icon-light {
            animation: glowing-wand-icon-light 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="flex items-center gap-3 flex-shrink-0 mb-4">
        <SparklesIcon className="w-6 h-6 text-blue-500 [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_8px_rgba(59,130,246,0.9))_drop-shadow(0_0_15px_rgba(37,99,235,0.7))]" />
        <h1 
          className="text-2xl font-bold" 
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            color: theme === 'light' ? '#172554' : 'white'
          }}
        >
          Upscale Controls
        </h1>
      </div>
      <div className="flex-grow overflow-y-auto no-scrollbar pr-2 space-y-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="video/*" 
          className="hidden" 
        />
        <div 
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex items-center justify-center gap-4 ${dragOver ? 'border-primary-color bg-blue-500/20' : 'border-primary-color/50 bg-blue-500/5 dark:bg-blue-500/10 hover:bg-blue-500/10 dark:hover:bg-blue-500/20'}`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragOver={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDrop={handleDrop}
          role="button"
        >
          <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CloudArrowUpIcon className="w-7 h-7 text-primary-color" />
          </div>
          <div>
            <p className="font-semibold text-sm">Drag & drop or click to upload</p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Max 1GB</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SparklesIconSolid className="w-5 h-5 text-green-500 [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_8px_rgba(74,222,128,0.9))_drop-shadow(0_0_15px_rgba(16,185,129,0.7))]" />
            <label htmlFor="prompt" className="block text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Visual Prompt:</label>
          </div>
          <div className={`relative bg-background-light dark:bg-background-dark rounded-lg transition-all duration-300 focus-within:border-blue-500/50 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.5)] ${
              theme === 'light' ? 'shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'border border-white/10'
          }`}>
            {theme === 'dark' ? <StarParticleAnimation /> : <UniverseAnimation />}
            <textarea 
              id="prompt" 
              rows={3} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 pr-24 bg-transparent border-none focus:ring-0 outline-none relative z-10" 
              placeholder="e.g., 'make video clear'"
            />
            <button onClick={handleGeminiEnhance} disabled={isEnhancing} className="absolute right-2 bottom-2 bg-gradient-to-br from-violet-500 to-purple-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 z-10">
              {isEnhancing ? <div className="gemini-btn-loader"></div> : <span>✨ Enhance</span>}
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
            <CustomDropdown 
                label="Duration" 
                options={durationOptions} 
                selected={duration} 
                setSelected={setDuration} 
                icon={<ClockIcon className="w-5 h-5 text-red-500" />}
                theme={theme}
            />
            <CustomDropdown 
                label="Resolution" 
                options={resolutionOptions} 
                selected={resolution} 
                setSelected={setResolution} 
                popupPosition="left"
                icon={<ArrowsPointingOutIcon className={`w-5 h-5 ${theme === 'light' ? 'text-purple-500' : 'text-white'} [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_8px_${theme==='light'?'rgba(168,85,247,0.9)':'rgba(255,255,255,0.9)'})_drop-shadow(0_0_15px_${theme==='light'?'rgba(147,51,234,0.7)':'rgba(255,255,255,0.7)'})]`} />}
                theme={theme}
            />
        </div>

        {/* --- Advance Feature Section --- */}
        <div className="mt-6">
            <button 
                onClick={() => setIsAdvanceOpen(prev => !prev)}
                className="w-full flex items-center justify-between p-2 rounded-lg"
            >
                <div className="flex items-center gap-2">
                    <Cog6ToothIcon 
                        className="w-5 h-5 text-cyan-400 animate-spin-axis"
                        style={{ filter: 'drop-shadow(0 0 2px #22d3ee) drop-shadow(0 0 5px #06b6d4)'}}
                    />
                    <span 
                        className="font-medium text-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Advance Feature
                    </span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isAdvanceOpen ? 'rotate-180' : ''}`} />
            </button>
            {isAdvanceOpen && (
                <div className={`mt-2 p-3 rounded-lg space-y-3 ${
                    theme === 'light' 
                    ? 'metallic-light' 
                    : 'bg-background-dark border border-gray-700'
                }`}>
                    {advanceFeatureOptions.map(feature => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={feature.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <IconComponent 
                                        className={`w-5 h-5 ${feature.color}`}
                                        style={{ filter: feature.glow }}
                                    />
                                    <span className="text-sm">{feature.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    {feature.id === 'interpolation' && feature.fpsOptions ? (
                                        <div className="flex items-center gap-2">
                                            {feature.fpsOptions.map(fps => (
                                                <button
                                                    key={fps.label}
                                                    onClick={() => handleFpsSelection(fps.label)}
                                                    className={`px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all ${
                                                        advanceFeatures.interpolation === fps.label
                                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                                    }`}
                                                >
                                                    <span>{fps.label}</span>
                                                    <div className="flex items-center gap-1">
                                                        <BoltIcon className="w-4 h-4 text-yellow-400" />
                                                        <span>{fps.credit}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-1 text-xs">
                                                <BoltIcon className="w-4 h-4 text-yellow-400" />
                                                <span>+ {feature.credit}</span>
                                            </div>
                                            <CustomSwitch 
                                                isOn={advanceFeatures[feature.id]}
                                                handleToggle={() => handleToggleFeature(feature.id)}
                                                theme={theme}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

      </div>
      <button 
        onClick={handleUpscale} 
        className={`w-full font-bold py-3 px-6 rounded-lg text-lg flex-shrink-0 mt-4 flex items-center justify-center gap-3
          ${theme === 'light' ? 'colorful-glass-button-light' : 'colorful-glass-button-dark text-white'}`
        }
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
            <SparklesIcon className={`w-6 h-6 ${theme === 'light' ? 'glowing-wand-icon-light' : 'glowing-wand-icon-dark'}`} />
            Upscale Now
        </div>
        <div className="absolute inset-0 z-0">
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
        </div>
      </button>
    </div>
  );
};

export default UpscaleControls;
