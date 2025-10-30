
import Image from 'next/image';
import type { Metadata } from 'next';
import { Award, Users, Handshake, Target } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

const aboutBannerImage = PlaceHolderImages.find(p => p.id === 'about-banner');
const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-main');

export const metadata: Metadata = {
  title: 'About KAWADY - Mild Steel & Fabrication Experts',
  description: 'Learn about KAWADY Mildsteel Consultants Ltd, our mission, and our experienced team. We are your dedicated technical partner for ensuring safety, efficiency, and structural integrity in all your steel projects.',
};

export default function AboutPage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        {aboutBannerImage && (
            <Image
                src={aboutBannerImage.imageUrl}
                alt={aboutBannerImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutBannerImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative container max-w-7xl h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
          <h1 className="text-3xl md:text-5xl font-bold">About KAWADY</h1>
          <p className="mt-2 text-md md:text-lg text-primary-foreground/90">Our Foundation is Trust</p>
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex items-start gap-4 md:gap-6">
              <Target className="h-10 w-10 md:h-12 md:w-12 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary">Our Mission</h3>
                <p className="mt-2 text-muted-foreground text-sm md:text-base">
                  To empower manufacturers and fabricators to achieve unparalleled strength, efficiency, and value in their mild steel applications through expert metallurgical guidance, process optimization, and failure analysis.
                </p>
              </div>
            </div>
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

    
