
export function BlueprintBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute left-0 top-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern
            id="blueprint-pattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 100V0h100"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              className="opacity-20 dark:opacity-10"
            />
          </pattern>
           <linearGradient id="color-shift-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0000" className="gradient-stop-1" />
              <stop offset="20%" stopColor="#0000ff" className="gradient-stop-2" />
              <stop offset="40%" stopColor="#ffff00" className="gradient-stop-1" />
              <stop offset="60%" stopColor="#D4AF37" className="gradient-stop-2" />
              <stop offset="80%" stopColor="#ffc0cb" className="gradient-stop-1" />
              <stop offset="100%" stopColor="#ff0000" className="gradient-stop-2" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#blueprint-pattern)"
        />
        <g className="animate-blueprint-draw">
          {/* Static lines for effect */}
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.2" />
        </g>
        {/* Animated lines */}
        <g className="animate-blueprint-scan">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#color-shift-gradient)" strokeWidth="2" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#color-shift-gradient)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
