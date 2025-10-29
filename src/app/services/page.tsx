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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="group flex flex-col bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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
                <CardContent className="flex-grow">
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
