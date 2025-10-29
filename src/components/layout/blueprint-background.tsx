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
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#blueprint-pattern)"
        />
        <g className="animate-blueprint-draw">
          {/* Vertical Lines */}
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="hsl(var(--accent))" strokeWidth="2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(var(--accent))" strokeWidth="1" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="hsl(var(--accent))" strokeWidth="2" />
          {/* Horizontal Lines */}
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--accent))" strokeWidth="2" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--accent))" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
