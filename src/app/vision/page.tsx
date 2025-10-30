
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { Globe, Leaf, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Future Vision - Our 2030 Roadmap',
  description: 'Discover KAWADY\'s vision for the future, including upcoming projects, sustainability goals, and our commitment to innovation in construction.',
};

const visionHeroImage = PlaceHolderImages.find(p => p.id === 'vision-hero');
const visionProject1 = PlaceHolderImages.find(p => p.id === 'vision-project-1');
const visionProject2 = PlaceHolderImages.find(p => p.id === 'vision-project-2');

const visionGoals = [
  {
    title: "Global Expansion",
    description: "Expanding our operations to new international markets, bringing KAWADY's expertise in steel consultancy to a global stage.",
    icon: <Globe className="w-10 h-10 text-accent" />
  },
  {
    title: "Sustainable Building",
    description: "Pioneering the use of green materials and carbon-neutral construction methods to lead the industry in sustainability.",
    icon: <Leaf className="w-10 h-10 text-accent" />
  },
  {
    title: "Digital Twin Integration",
    description: "Implementing digital twin technology for real-time monitoring, predictive maintenance, and lifecycle management of all our projects.",
    icon: <Layers className="w-10 h-10 text-accent" />
  }
];

export default function VisionPage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        {visionHeroImage && (
          <Image
            src={visionHeroImage.imageUrl}
            alt={visionHeroImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={visionHeroImage.imageHint}
            priority
          />
        )}
        <BlueprintBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        <div className="relative container max-w-7xl text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Building Tomorrow</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our vision for the next decade is built on innovation, sustainability, and global reach.
          </p>
        </div>
      </section>

      {/* 2030 Vision Infographic Section */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Our 2030 Vision</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              We are committed to three core pillars of growth that will define the future of our company and the industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visionGoals.map((goal) => (
              <div key={goal.title} className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full text-center items-center bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                  <div className="[transform:translateZ(40px)] p-6 flex flex-col flex-grow items-center">
                    <CardHeader className="p-0 items-center">
                      <div className="p-4 bg-accent/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        {goal.icon}
                      </div>
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <p className="text-muted-foreground">{goal.description}</p>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Developments Section */}
      <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Upcoming Developments</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              A preview of the groundbreaking projects that will shape our future.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg group">
              {visionProject1 && (
                <Image
                  src={visionProject1.imageUrl}
                  alt={visionProject1.description}
                  width={600}
                  height={450}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={visionProject1.imageHint}
                />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary">Project Phoenix: The Vertical Forest</h3>
              <p className="mt-2 text-muted-foreground">
                An ambitious eco-skyscraper that integrates living flora into its facade, creating a self-sustaining ecosystem in the heart of the city. It will set a new standard for green architecture in the region.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
            <div className="md:order-2 rounded-lg overflow-hidden shadow-lg group">
              {visionProject2 && (
                <Image
                  src={visionProject2.imageUrl}
                  alt={visionProject2.description}
                  width={600}
                  height={450}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={visionProject2.imageHint}
                />
              )}
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-semibold text-primary">Project Nexus: Smart City Grid</h3>
              <p className="mt-2 text-muted-foreground">
                A foundational infrastructure project to develop a fully integrated smart grid, connecting utilities, transport, and public services for unparalleled efficiency and quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
