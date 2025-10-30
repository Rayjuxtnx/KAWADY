
'use client';

import { useState, useEffect } from 'react';
import { Leaf, Zap, Puzzle, Recycling } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { useTheme } from 'next-themes';

const Counter = ({ end, duration = 2, isPercentage = false }: { end: number; duration?: number; isPercentage?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const finalEnd = isNaN(end) ? 0 : end;
    const range = finalEnd - start;
    let current = start;
    const increment = finalEnd > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration * 1000 / range));

    const timer = setInterval(() => {
      current += increment;
      // Approximate the count up to the end
      if ((increment > 0 && current >= finalEnd) || (increment < 0 && current <= finalEnd)) {
        current = finalEnd;
        clearInterval(timer);
      }
      setCount(current);
    }, stepTime > 0 ? stepTime : 1);

    return () => clearInterval(timer);
  }, [end, duration, isPercentage]);
  
  // Update with small random amounts after initial animation
  useEffect(() => {
    if (count === end) {
      const interval = setInterval(() => {
        setCount(prevCount => {
            const newCount = prevCount + (Math.random() * (isPercentage ? 0.01 : 0.1));
            return parseFloat(newCount.toFixed(isPercentage ? 2 : 1));
        });
      }, 3000 + Math.random() * 2000); // every 3-5 seconds
      return () => clearInterval(interval);
    }
  }, [count, end, isPercentage]);

  return (
    <span className="font-bold text-4xl md:text-5xl text-primary tabular-nums">
      {count.toLocaleString(undefined, { maximumFractionDigits: isPercentage ? 2 : 1, minimumFractionDigits: isPercentage ? 2 : 0})}
      {isPercentage && <span className="text-2xl md:text-3xl ml-1">%</span>}
    </span>
  );
};


const sustainabilityMetrics = [
  {
    title: 'Tons of CO₂ Saved',
    icon: <Leaf className="w-10 h-10 text-green-400" />,
    value: 1250,
    isPercentage: false,
    description: "Equivalent to planting over 20,000 trees annually."
  },
  {
    title: 'Energy Efficiency Improvement',
    icon: <Zap className="w-10 h-10 text-yellow-400" />,
    value: 35.75,
    isPercentage: true,
    description: "Achieved through optimized processes and material selection."
  },
  {
    title: 'Recycled & Smart Materials Used',
    icon: <Recycling className="w-10 h-10 text-blue-400" />,
    value: 82.5,
    isPercentage: true,
    description: "Reducing waste and enhancing structural performance."
  },
];

export default function SustainabilityPage() {
  const { theme } = useTheme();
  
  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12 relative">
             <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-10">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="url(#glow-gradient-sustainability)"
                          strokeWidth="5"
                          fill="none"
                          className="color-scanner-ring"
                      />
                  </svg>
              </div>
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="glow-gradient-sustainability" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(140, 70%, 55%)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Sustainability & Efficiency</h1>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Measuring our commitment to a greener, stronger future.
                 <br />
                <span className="relative flex h-3 w-3 mx-auto mt-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    <span className="ml-4 text-xs text-green-400 uppercase font-bold tracking-wider">live</span>
                </span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sustainabilityMetrics.map((metric) => (
                <div key={metric.title} className="group" style={{ perspective: '1000px' }}>
                    <Card 
                        className="flex flex-col h-full bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 [transform-style:preserve-3d] border-t-2 border-green-500/50"
                        style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}
                    >
                        <div className="[transform:translateZ(40px)] p-4 md:p-6 flex flex-col flex-grow text-center items-center">
                            <CardHeader className="p-0 flex-shrink-0 mb-4 items-center">
                                <div className="p-4 rounded-full bg-background mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {metric.icon}
                                </div>
                                <CardTitle className="text-lg md:text-xl text-primary">{metric.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-grow flex flex-col justify-center items-center">
                                <Counter end={metric.value} isPercentage={metric.isPercentage} />
                                <p className="mt-4 text-muted-foreground text-xs">{metric.description}</p>
                            </CardContent>
                        </div>
                    </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
