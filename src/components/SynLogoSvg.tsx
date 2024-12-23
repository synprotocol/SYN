export default function SynLogoSvg() {
  return (
    <svg 
      viewBox="0 0 120 120" 
      className="w-[120px] h-[120px] animate-float"
    >
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Cercle externe */}
      <circle 
        cx="60" 
        cy="60" 
        r="58" 
        fill="none" 
        stroke="url(#glow)" 
        strokeWidth="1"
      />
      
      {/* Lettres SYN */}
      <text
        x="60"
        y="65"
        textAnchor="middle"
        className="text-2xl font-light fill-[#00ff9d]"
        style={{ fontFamily: 'monospace' }}
      >
        SYN
      </text>
      
      {/* Points de connexion */}
      <g className="animate-pulse">
        <circle cx="30" cy="60" r="2" fill="#00ff9d" />
        <circle cx="90" cy="60" r="2" fill="#00ff9d" />
        <circle cx="60" cy="30" r="2" fill="#00ff9d" />
      </g>
    </svg>
  );
} 