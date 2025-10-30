
import Image from 'next/image';
import type { Metadata } from 'next';
import { Award, Users, Handshake, Target } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-main');

export const metadata: Metadata = {
  title: 'About KAWADY - Mild Steel & Fabrication Experts',
  description: 'Learn about KAWADY Mildsteel Consultants Ltd, our mission, and our experienced team. We are your dedicated technical partner for ensuring safety, efficiency, and structural integrity in all your steel projects.',
};

export default function AboutPage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <BlueprintBackground />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-10">
                <svg className="absolute inset-0 w-full h-full animate-simple-rotate" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#glow-gradient-about)"
                        strokeWidth="5"
                        fill="none"
                    />
                    <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="hsl(var(--accent))"
                        fontSize="20"
                        fontWeight="bold"
                        style={{ filter: 'blur(1.5px)' }}
                    >
                        KAWADY
                    </text>
                </svg>
            </div>
        </div>
         <svg width="0" height="0">
            <defs>
              <linearGradient id="glow-gradient-about" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
        </svg>
        <div className="relative container max-w-7xl h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">About KAWADY</h1>
          <p className="mt-2 text-md md:text-lg text-muted-foreground">Our Foundation is Trust</p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 md:py-24 bg-card relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Your Technical Partner in Steel</h2>
              <p className="mt-4 text-muted-foreground text-sm md:text-base">
                KAWADY Mildsteel Consultancy Company LTD acts as your specialized technical partner. We empower manufacturers and fabricators to overcome challenges across a project's entire lifecycle, ensuring safety, efficiency, and cost-effectiveness.
              </p>
              <p className="mt-4 text-muted-foreground text-sm md:text-base">
                Our role involves specifying the ideal mild steel grades, optimizing welding procedures, and troubleshooting critical issues like cracking. A core service is our expert failure analysis, where we diagnose root causes to prevent future problems. At KAWADY, we provide the definitive guidance to de-risk your projects, guarantee compliance, and ensure the structural integrity and reliability of your steel components.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
              {aboutMainImage && (
                <div className="relative aspect-[4/3]">
                  <Image
                      src={aboutMainImage.imageUrl}
                      alt={aboutMainImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={aboutMainImage.imageHint}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full bg-card/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                    <div className="[transform:translateZ(40px)] p-6 flex flex-col flex-grow">
                        <div className="flex items-start gap-4 md:gap-6">
                            <Target className="h-10 w-10 md:h-12 md:w-12 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-primary">Our Mission</h3>
                                <p className="mt-2 text-muted-foreground text-sm md:text-base">
                                To empower manufacturers and fabricators to achieve unparalleled strength, efficiency, and value in their mild steel applications through expert metallurgical guidance, process optimization, and failure analysis.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full bg-card/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                    <div className="[transform:translateZ(40px)] p-6 flex flex-col flex-grow">
                        <div className="flex items-start gap-4 md:gap-6">
                        <Handshake className="h-10 w-10 md:h-12 md:w-12 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-primary">Our Vision</h3>
                            <p className="mt-2 text-muted-foreground text-sm md:text-base">
                            Our vision is to be the leading provider of expert consultancy services in mild steel solutions, delivering innovative, sustainable, and high-quality outcomes that empower our clients to build stronger, safer, and more efficient infrastructures globally.
                            </p>
                        </div>
                        </div>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner with Us Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Why Partner with Us?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-sm md:text-base">
            Choosing KAWADY mildsteel consultants Ltd means choosing a partner committed to the success of your vision.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="p-4 md:p-6 rounded-lg">
              <Award className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-primary">Unmatched Experience</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">Our team's extensive experience across diverse project types ensures knowledgeable and effective project leadership.</p>
            </div>
            <div className="p-4 md:p-6 rounded-lg">
              <Users className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-primary">Client-Centric Focus</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">We prioritize your goals, maintaining open communication and tailoring our strategies to fit your specific needs.</p>
            </div>
            <div className="p-4 md:p-6 rounded-lg">
              <Handshake className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-primary">Commitment to Quality</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">We uphold the highest standards of quality and safety, from the initial blueprint to the final handover.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
