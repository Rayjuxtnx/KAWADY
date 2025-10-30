
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { Lightbulb, DraftingCompass, BarChart3, HardHat, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

const processSteps = [
  {
    step: 1,
    title: 'Concept & Feasibility',
    icon: <Lightbulb className="w-8 h-8" />,
    shortText: 'Defining the vision.',
    longText: 'We collaborate with you to define project goals, scope, and initial budget. Our feasibility studies assess viability, ensuring a solid foundation for your vision.',
  },
  {
    step: 2,
    title: 'Design & Engineering',
    icon: <DraftingCompass className="w-8 h-8" />,
    shortText: 'Blueprinting success.',
    longText: 'Our engineers create detailed blueprints and structural designs. We use Building Information Modeling (BIM) to create precise 3D models for planning and coordination.',
  },
  {
    step: 3,
    title: 'Analysis & Optimization',
    icon: <BarChart3 className="w-8 h-8" />,
    shortText: 'De-risking the plan.',
    longText: 'We use advanced analysis to detect structural risks and optimize material usage before construction begins, saving time and resources while ensuring safety.',
  },
  {
    step: 4,
    title: 'Construction & Fabrication',
    icon: <HardHat className="w-8 h-8" />,
    shortText: 'Bringing vision to life.',
    longText: 'With meticulous project management and on-site audits, we oversee the fabrication and construction phases, ensuring the highest standards of quality are met.',
  },
  {
    step: 5,
    title: 'Handover & Support',
    icon: <KeyRound className="w-8 h-8" />,
    shortText: 'Delivering excellence.',
    longText: 'Upon completion, we conduct final inspections and formally hand over the project. We remain available for post-completion support to ensure long-term success.',
  },
];

export default function HowWeWorkPage() {
    const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const step = parseInt(entry.target.getAttribute('data-step') || '0', 10);
                        setVisibleSteps((prev) => new Set(prev).add(step));
                    }
                });
            },
            { threshold: 0.5 }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            stepRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">How We Work</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              Our process is a blueprint for success. We guide your project through five distinct phases, ensuring quality, efficiency, and transparency from start to finish.
            </p>
          </div>

          <div className="relative">
            {/* The vertical line */}
            <div className="absolute left-1/2 -ml-[2px] h-full w-1 bg-border/50 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              {processSteps.map((item, index) => (
                <div
                    key={item.step}
                    ref={el => stepRefs.current[index] = el}
                    data-step={item.step}
                    className={cn(
                        'relative transition-all duration-700 ease-out transform',
                        visibleSteps.has(item.step) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                        'md:flex md:items-center',
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    )}
                >
                    {/* The Circle on the timeline */}
                    <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 left-1/2 -ml-4 h-8 w-8 rounded-full border-4 border-accent bg-background flex items-center justify-center text-accent font-bold hidden md:flex",
                        visibleSteps.has(item.step) ? 'scale-100' : 'scale-0'
                    )}>
                      {item.step}
                    </div>

                  <div className={cn("md:w-[calc(50%-2rem)]", index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto')}>
                     <div className="group" style={{ perspective: '1000px' }}>
                        <Card className="bg-card/50 backdrop-blur-lg border-accent/20 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                            <div className="[transform:translateZ(40px)] p-6">
                                <CardHeader className="p-0 flex flex-row items-center gap-4 mb-4">
                                <div className="p-3 bg-accent/10 rounded-full text-accent">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-accent font-semibold">{`Phase ${item.step}`}</p>
                                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                                </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                <p className="text-muted-foreground transition-opacity duration-300 md:group-hover:opacity-0">{item.shortText}</p>
                                <p className="text-muted-foreground absolute top-0 left-0 p-6 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 hidden md:block pt-[6.5rem]">
                                    {item.longText}
                                </p>
                                <p className="text-muted-foreground mt-2 md:hidden">{item.longText}</p>
                                </CardContent>
                            </div>
                        </Card>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
