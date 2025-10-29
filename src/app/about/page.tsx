import Image from 'next/image';
import type { Metadata } from 'next';
import { Award, Users, Handshake, Target } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutBannerImage = PlaceHolderImages.find(p => p.id === 'about-banner');
const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-main');

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Kawida\'s mission, vision, and the experienced team dedicated to your project\'s success.',
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
        <div className="relative container max-w-7xl h-full flex flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-bold">About Kawida</h1>
          <p className="mt-2 text-lg text-primary-foreground/90">Our Foundation is Trust</p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-primary">Our Story</h2>
              <p className="mt-4 text-muted-foreground">
                Founded on the principles of integrity and expertise, Kawida has grown into a leading consultancy firm in the construction industry. We are a team of passionate engineers, project managers, and financial analysts dedicated to turning complex construction challenges into successful realities.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our journey began with a simple mission: to provide transparent, reliable, and innovative consultancy that clients can depend on. Today, we've managed a diverse portfolio of projects, from towering skyscrapers to critical public infrastructure, always upholding our core commitment to excellence.
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
            <div className="flex items-start gap-6">
              <Target className="h-12 w-12 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
                <p className="mt-2 text-muted-foreground">
                  To deliver exceptional construction consultancy services by combining technical expertise with a client-focused approach, ensuring every project we undertake is a benchmark for quality and efficiency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <Handshake className="h-12 w-12 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary">Our Vision</h3>
                <p className="mt-2 text-muted-foreground">
                  To be the most trusted and sought-after construction consultancy firm, recognized for our innovative solutions, unwavering integrity, and positive impact on the built environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner with Us Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-primary">Why Partner with Us?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Choosing Kawida means choosing a partner committed to the success of your vision.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-lg">
              <Award className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary">Unmatched Experience</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our team's extensive experience across diverse project types ensures knowledgeable and effective project leadership.</p>
            </div>
            <div className="p-6 rounded-lg">
              <Users className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary">Client-Centric Focus</h3>
              <p className="mt-2 text-sm text-muted-foreground">We prioritize your goals, maintaining open communication and tailoring our strategies to fit your specific needs.</p>
            </div>
            <div className="p-6 rounded-lg">
              <Handshake className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary">Commitment to Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">We uphold the highest standards of quality and safety, from the initial blueprint to the final handover.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
