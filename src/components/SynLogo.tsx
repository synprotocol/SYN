'use client';

export default function SynLogo() {
  return (
    <svg 
      viewBox="0 0 300 300" 
      className="w-full h-full animate-float"
    >
      {/* Définitions des gradients */}
      <defs>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Cercle externe avec rotation */}
      <circle 
        cx="150" 
        cy="150" 
        r="140" 
        fill="none" 
        stroke="url(#glowGradient)" 
        strokeWidth="1.5"
        className="animate-spin-slow"
      />

      {/* Hexagone central */}
      <path
        d="M150 40L245 95L245 205L150 260L55 205L55 95Z"
        fill="none"
        stroke="#00ff9d"
        strokeWidth="2.5"
        className="opacity-30"
      />

      {/* Lignes de connexion internes */}
      <g className="opacity-50">
        <line x1="150" y1="40" x2="150" y2="260" stroke="#00ff9d" strokeWidth="0.75" />
        <line x1="55" y1="95" x2="245" y2="205" stroke="#00ff9d" strokeWidth="0.75" />
        <line x1="55" y1="205" x2="245" y2="95" stroke="#00ff9d" strokeWidth="0.75" />
      </g>

      {/* Points de connexion animés */}
      <g className="animate-pulse">
        <circle cx="150" cy="40" r="4" fill="#00ff9d" />
        <circle cx="245" cy="95" r="4" fill="#00ff9d" />
        <circle cx="245" cy="205" r="4" fill="#00ff9d" />
        <circle cx="150" cy="260" r="4" fill="#00ff9d" />
        <circle cx="55" cy="205" r="4" fill="#00ff9d" />
        <circle cx="55" cy="95" r="4" fill="#00ff9d" />
      </g>

      {/* Point central pulsant */}
      <circle 
        cx="150" 
        cy="150" 
        r="6" 
        fill="#00ff9d" 
        filter="url(#glow)"
        className="animate-pulse"
      />

      {/* Texte SYN */}
      <text
        x="150"
        y="165"
        textAnchor="middle"
        fill="#00ff9d"
        fontSize="36"
        fontFamily="monospace"
        className="font-light tracking-widest"
      >
        SYN
      </text>
    </svg>
  );
} 