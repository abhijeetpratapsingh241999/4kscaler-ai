import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo: React.FC = () => (
  <Link to="/" className="h-16 flex items-center gap-3 px-2 flex-shrink-0" aria-label="Homepage">
    <span aria-label="4kscaler-ai logo">
      {/* Original SVG code for the logo */}
      <svg className="w-10 h-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="glass-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feSpecularLighting in="blur" surfaceScale={5} specularConstant={0.75} specularExponent={20} lightingColor="#white" result="specOut">
              <fePointLight x={-5000} y={-10000} z={20000} />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceGraphic" operator="in" result="specOut" />
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1={0} k2={1} k3={1} k4={0} result="litPaint" />
          </filter>
        </defs>
        <g filter="url(#glass-glow)">
          <path d="M100 100 L20 10 C 10 50, 40 90, 100 100 Z" fill="url(#grad1)" />
          <path d="M100 100 L180 10 C 190 50, 160 90, 100 100 Z" fill="url(#grad2)" />
          <path d="M100 100 L20 190 C 10 150, 40 110, 100 100 Z" fill="url(#grad2)" />
          <path d="M100 100 L180 190 C 190 150, 160 110, 100 100 Z" fill="url(#grad1)" />
        </g>
      </svg>
    </span>
    {/* Logo text with gradient styling */}
    <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">4k</span>
      <span className="font-light text-text-secondary-light dark:text-text-secondary-dark">scaler-</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600 font-semibold">ai</span>
    </span>
  </Link>
);

export default BrandLogo;
