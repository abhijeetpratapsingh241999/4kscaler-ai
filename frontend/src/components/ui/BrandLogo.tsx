import React from 'react';

// Keyframes ko define karne ke liye style tag.
// React project me, yeh aam taur par CSS file me hota hai.
const AnimationStyles = () => (
  <style>
    {`
      @keyframes flap-left {
        0%, 100% {
          transform: rotateY(0deg) rotateZ(-5deg);
        }
        50% {
          transform: rotateY(60deg) rotateZ(-10deg) translateX(-5px);
        }
      }
      @keyframes flap-right {
        0%, 100% {
          transform: rotateY(0deg) rotateZ(5deg);
        }
        50% {
          transform: rotateY(-60deg) rotateZ(10deg) translateX(5px);
        }
      }
      .animate-flap-left {
        animation: flap-left 2s infinite ease-in-out;
      }
      .animate-flap-right {
        animation: flap-right 2s infinite ease-in-out;
      }
    `}
  </style>
);

// Butterfly ke पंखों (wings) ke liye ek component
const Wing = ({ className, children, style }: { className: string; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className={`absolute ${className}`} style={style}>
    {children}
  </div>
);

const Logo = () => {
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="flex items-center space-x-3">
      {/* Butterfly Logo Container - Made even smaller for mobile compatibility */}
      <div style={{ perspective: '800px' }} className="relative w-8 h-8 flex items-center justify-center cursor-pointer group">
        
        {/* --- Baayin Taraf ke Pankh (Left Wings) --- */}
        <div className="absolute right-1/2 -mr-1 w-6 h-8 animate-flap-left -top-2" style={{ transformStyle: 'preserve-3d' }}>
          {/* Upar ka baayin pankh */}
          <Wing className="top-0 left-0 w-6 h-6 rounded-tl-full rounded-br-[60%] shadow-lg transform -rotate-45 origin-bottom-right" style={{
            background: 'radial-gradient(circle at 30% 30%, #ff6b6b 0%, #ffa726 15%, #ffeb3b 30%, #66bb6a 45%, #42a5f5 60%, #ab47bc 75%, #ec407a 90%)',
            filter: isDarkMode 
              ? 'drop-shadow(0 0 4px rgba(251, 146, 60, 0.6)) drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))'
              : 'drop-shadow(0 0 4px rgba(0, 123, 255, 0.5)) drop-shadow(0 0 8px rgba(0, 123, 255, 0.3))'
          }}>
              {/* Pankh par pattern - Multiple spots */}
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-80 blur-sm"></div>
              <div className="absolute top-1.5 left-1.5 w-0.5 h-0.5 bg-red-400 rounded-full opacity-70 blur-sm"></div>
              <div className="absolute top-2.5 left-0.5 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60 blur-sm"></div>
          </Wing>
          {/* Neeche ka baayin pankh */}
          <Wing className="bottom-0 left-0 w-4 h-4 rounded-bl-full rounded-tr-[70%] shadow-md transform rotate-45 origin-top-right" style={{
            background: 'radial-gradient(circle at 70% 70%, #ff6b6b 0%, #ffa726 20%, #ffeb3b 40%, #66bb6a 60%, #42a5f5 80%, #ab47bc 100%)',
            filter: isDarkMode 
              ? 'drop-shadow(0 0 3px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 6px rgba(236, 72, 153, 0.4))'
              : 'drop-shadow(0 0 3px rgba(0, 123, 255, 0.5)) drop-shadow(0 0 6px rgba(0, 123, 255, 0.3))'
          }}>
               <div className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-red-400 rounded-full opacity-70 blur-sm"></div>
               <div className="absolute bottom-1.5 left-1.5 w-0.5 h-0.5 bg-green-400 rounded-full opacity-60 blur-sm"></div>
          </Wing>
        </div>

        {/* --- Daayin Taraf ke Pankh (Right Wings) --- */}
        <div className="absolute left-1/2 -ml-1 w-6 h-8 animate-flap-right -top-2" style={{ transformStyle: 'preserve-3d' }}>
          {/* Upar ka daayin pankh */}
          <Wing className="top-0 right-0 w-6 h-6 rounded-tr-full rounded-bl-[60%] shadow-lg transform rotate-45 origin-bottom-left" style={{
            background: 'radial-gradient(circle at 70% 30%, #ff6b6b 0%, #ffa726 15%, #ffeb3b 30%, #66bb6a 45%, #42a5f5 60%, #ab47bc 75%, #ec407a 90%)',
            filter: isDarkMode 
              ? 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
              : 'drop-shadow(0 0 4px rgba(0, 123, 255, 0.5)) drop-shadow(0 0 8px rgba(0, 123, 255, 0.3))'
          }}>
               <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-teal-200 rounded-full opacity-80 blur-sm"></div>
               <div className="absolute top-1.5 right-1.5 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-70 blur-sm"></div>
               <div className="absolute top-2.5 right-0.5 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-60 blur-sm"></div>
          </Wing>
          {/* Neeche ka daayin pankh */}
          <Wing className="bottom-0 right-0 w-4 h-4 rounded-br-full rounded-tl-[70%] shadow-md transform -rotate-45 origin-top-left" style={{
            background: 'radial-gradient(circle at 30% 70%, #ff6b6b 0%, #ffa726 20%, #ffeb3b 40%, #66bb6a 60%, #42a5f5 80%, #ab47bc 100%)',
            filter: isDarkMode 
              ? 'drop-shadow(0 0 3px rgba(79, 70, 229, 0.6)) drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))'
              : 'drop-shadow(0 0 3px rgba(0, 123, 255, 0.5)) drop-shadow(0 0 6px rgba(0, 123, 255, 0.3))'
          }}>
              <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-70 blur-sm"></div>
              <div className="absolute bottom-1.5 right-1.5 w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-60 blur-sm"></div>
          </Wing>
        </div>

        {/* --- Butterfly ka Shareer (Body) - Light Mode Sky Blue with Glow --- */}
        <div className="relative flex flex-col items-center z-10" style={{ 
          filter: isDarkMode 
            ? 'drop-shadow(0 0 6px rgba(255,255,255,0.7)) drop-shadow(0 0 10px rgba(255,255,255,0.5))'
            : 'drop-shadow(0 0 6px rgba(0, 123, 255, 0.6)) drop-shadow(0 0 12px rgba(0, 123, 255, 0.4))'
        }}>
          {/* Head and Antennae */}
          <div className="relative -mb-0.5 z-20">
              {/* Head */}
              <div className={`w-1 h-0.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-white via-gray-100 to-gray-200' 
                  : 'bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600'
              }`}></div>
              {/* Antennae */}
              <div className={`absolute bottom-0.5 left-1/2 -translate-x-1 w-px h-1.5 transform -rotate-30 origin-bottom group-hover:rotate-[-40deg] transition-transform duration-300 ${
                isDarkMode ? 'bg-white' : 'bg-sky-500'
              }`}>
                  <div className={`w-0.5 h-0.5 rounded-full -mt-0.5 -ml-0.5 ${
                    isDarkMode ? 'bg-white' : 'bg-sky-600'
                  }`}></div>
              </div>
              <div className={`absolute bottom-0.5 left-1/2 translate-x-1 w-px h-1.5 transform rotate-30 origin-bottom group-hover:rotate-[40deg] transition-transform duration-300 ${
                isDarkMode ? 'bg-white' : 'bg-sky-500'
              }`}>
                  <div className={`w-0.5 h-0.5 rounded-full -mt-0.5 -ml-0.5 ${
                    isDarkMode ? 'bg-white' : 'bg-sky-600'
                  }`}></div>
              </div>
          </div>
          
          {/* Thorax (Chest part) */}
          <div className={`w-1.5 h-2 rounded-xl -mb-0.5 z-10 shadow-inner ${
            isDarkMode 
              ? 'bg-gradient-to-b from-white via-gray-100 to-gray-200' 
              : 'bg-gradient-to-b from-sky-500 via-sky-600 to-sky-700'
          }`}></div>

          {/* Abdomen (Lower part) */}
          <div className={`w-1 h-4 rounded-b-full rounded-t-md shadow-inner ${
            isDarkMode 
              ? 'bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300' 
              : 'bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800'
          }`}></div>
        </div>

      </div>

      {/* Logo Text - Made smaller for mobile */}
      <div className="hidden md:flex flex-col">
        <span className="text-2xl sm:text-3xl font-bold font-poppins bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          VideoAI
        </span>
      </div>

      {/* Animation Styles */}
      <AnimationStyles />
    </div>
  );
};

export default Logo;
