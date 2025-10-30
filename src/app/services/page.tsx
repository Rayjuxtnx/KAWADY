
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

export const metadata: Metadata = {
  title: 'Our Consultancy Services - WPS, Failure Analysis, Audits',
  description: 'Explore our full range of mild steel consultancy services: WPS Development, Root Cause Failure Analysis, Material Selection, Fabrication Audits, and Staff Training.',
};

export default function ServicesPage() {
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
                          stroke="url(#glow-gradient-services)"
                          strokeWidth="5"
                          fill="none"
                          className="color-scanner-ring"
                      />
                      <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fill="url(#color-shift-gradient)"
                          fontSize="20"
                          fontWeight="bold"
                          style={{ filter: 'blur(1.5px)' }}
                          className="animate-multi-color-text-glow"
                      >
                          KAWADY
                      </text>
                  </svg>
              </div>
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="glow-gradient-services" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Expertise</h1>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                We offer a full spectrum of services to guide your project from concept to successful completion. Our expert team is equipped to handle every challenge.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                  <div className="[transform:translateZ(40px)] p-4 md:p-6 flex flex-col flex-grow">
                    <CardHeader className="p-0 flex-shrink-0 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-3 md:p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <div className="relative overflow-hidden">
                            <p className="text-muted-foreground text-reveal-animate">{service.description}</p>
                        </div>
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
