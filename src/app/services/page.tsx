
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the comprehensive range of construction consultancy services offered by Kawida, from project management to feasibility studies.',
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
            {services.map((service) => (
              <Card key={service.title} className="group flex flex-col bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d] hover:[transform:rotateY(var(--y-angle))_rotateX(var(--x-angle))] relative overflow-hidden">
                <div className="absolute inset-0 bg-transparent group-hover:border-4 group-hover:border-accent transition-all duration-300 pointer-events-none rounded-lg" style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0), 0 0 30px hsl(var(--accent) / 0)' }}></div>
                <div className="[transform:translateZ(40px)] w-full">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/10 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow relative">
                      <div className="relative overflow-hidden">
                          <p className="text-muted-foreground text-reveal-animate">{service.description}</p>
                      </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
