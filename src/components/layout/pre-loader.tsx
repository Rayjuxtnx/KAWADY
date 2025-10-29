
'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { BlueprintBackground } from './blueprint-background';

export function PreLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
      setTimeout(() => setLoading(false), 500); // Wait for fadeout animation
    }, 2000); // Show pre-loader for 2 seconds

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
      <div className="flex items-center gap-4 relative">
        <Sparkles className="h-12 w-12 text-accent welding-spark" />
        <h1 className="text-5xl font-bold tracking-wider relative overflow-hidden">
          <span className="text-reveal-animate">KAWADY</span>
        </h1>
      </div>
      <p className="mt-4 text-lg text-white/80">Building with Insight</p>
    </div>
  );
}
