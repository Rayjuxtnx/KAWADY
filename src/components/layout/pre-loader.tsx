
'use client';

import React, { useState, useEffect } from 'react';
import { BlueprintBackground } from './blueprint-background';

export function PreLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
      setTimeout(() => setLoading(false), 500); // Wait for fadeout animation
    }, 2500); // Show pre-loader for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-white transition-opacity duration-500 ${
        fadeout ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <BlueprintBackground />
      <div className="flex flex-col items-center justify-center gap-4 p-4 relative">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <svg className="absolute inset-0 w-full h-full animate-rotate" viewBox="0 0 100 100">
            <circle 
              className="animate-circle-draw"
              cx="50" 
              cy="50" 
              r="45" 
              stroke="url(#glow-gradient)" 
              strokeWidth="5" 
              fill="none" 
            />
          </svg>
           <svg width="0" height="0">
            <defs>
              <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider relative animate-multi-color-text-glow text-center">
          KAWADY
        </h1>
      </div>
      <p className="absolute bottom-10 mt-4 text-base md:text-lg text-white/80 text-center px-4">Building with Insight</p>
    </div>
  );
}
