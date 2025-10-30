
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { Flame, Wrench, ShieldCheck, Gem } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Metalworks & Expert Fabrication Services',
  description: 'Specialized services in custom metalworks, expert welding, and artistic iron fabrication. Precision engineering for durable and aesthetic results in every project.',
};

const metalworksHeroImage = PlaceHolderImages.find(p => p.id === 'metalworks-hero');
const qualityImage = PlaceHolderImages.find(p => p.id === 'metalworks-quality');

const metalServices = [
  {
    title: 'Custom Metalworks',
    description: 'We craft bespoke metal components tailored to your exact specifications. From structural elements to decorative pieces, our work combines form and function.',
    icon: <Wrench className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Expert Welding',
    description: 'Our certified welders deliver flawless joins and robust fabrication using advanced techniques for steel, aluminum, and other alloys.',
    icon: <Flame className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Artistic Iron Fabrication',
    description: 'Transforming raw iron into functional art. We specialize in custom gates, railings, and ornamental ironwork that adds timeless elegance.',
    icon: <Gem className="w-8 h-8 text-accent" />,
  },
];

export default function MetalworksPage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        {metalworksHeroImage && (
            <Image
                src={metalworksHeroImage.imageUrl}
                alt={metalworksHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={metalworksHeroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative container max-w-7xl h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
          <h1 className="text-4xl md:text-5xl font-bold">Expert Metalworks & Fabrication</h1>
          <p className="mt-2 text-lg text-primary-foreground/90">Precision, Strength, and Artistry in Every Piece</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Our Fabrication Services</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              From heavy-duty structural steel to intricate ironwork, we provide a full range of metal fabrication services built on a foundation of quality and precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metalServices.map((service) => (
              <div key={service.title} className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                  <div className="absolute inset-0 bg-transparent group-hover:border-4 group-hover:border-accent transition-all duration-300 pointer-events-none rounded-lg" />
                  <div className="[transform:translateZ(40px)] p-4 md:p-6 flex flex-col flex-grow">
                      <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-4">
                          <div className="bg-accent/10 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                          </div>
                          <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
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

      {/* Quality Commitment Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary">Uncompromising Quality</h2>
              <p className="mt-4 text-muted-foreground">
                Quality is not just a goal; it's our guarantee. We adhere to the strictest industry standards, ensuring that every cut, weld, and finish is executed with precision. Our commitment to excellence ensures structural integrity, durability, and a flawless final product that you can trust.
              </p>
              <div className="mt-8 flex items-center gap-4 text-primary">
                <ShieldCheck className="h-10 w-10 text-accent" />
                <div>
                  <h3 className="font-semibold">Certified & Inspected</h3>
                  <p className="text-muted-foreground">All our work undergoes rigorous inspection to meet and exceed safety and quality regulations.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
                {qualityImage && (
                    <div className="relative aspect-[4/3]">
                        <Image
                            src={qualityImage.imageUrl}
                            alt={qualityImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={qualityImage.imageHint}
                        />
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    