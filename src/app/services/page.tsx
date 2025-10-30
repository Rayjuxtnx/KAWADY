
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Expertise</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              We offer a full spectrum of services to guide your project from concept to successful completion. Our expert team is equipped to handle every challenge.
            </p>
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

    