
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Flame, Wrench, Gem, Leaf, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service } from '@/lib/services';
import { services } from '@/lib/services';
import { galleryImages } from '@/lib/gallery-data';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { RecyclingIcon } from '@/components/icons/RecyclingIcon';


const homeHeroImage = PlaceHolderImages.find(p => p.id === 'home-hero');
const aboutMainImage = PlaceHolderImages.find(p => p.id === 'about-main');

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

const Counter = ({ end, isPercentage = false }: { end: number; isPercentage?: boolean }) => {
    const [currentValue, setCurrentValue] = useState(end);
    const prevValueRef = useRef(end);

    useEffect(() => {
        const previousValue = prevValueRef.current;
        const difference = end - previousValue;
        let startTimestamp: number | null = null;
        const duration = 1000;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const nextValue = previousValue + (difference * progress);
            
            setCurrentValue(nextValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                prevValueRef.current = end;
            }
        };

        requestAnimationFrame(step);

    }, [end]);

    return (
        <span className="font-bold text-4xl md:text-5xl text-primary tabular-nums">
            {currentValue.toLocaleString(undefined, { maximumFractionDigits: isPercentage ? 2 : 1, minimumFractionDigits: isPercentage ? 2 : 0})}
            {isPercentage && <span className="text-2xl md:text-3xl ml-1">%</span>}
        </span>
    );
};


const initialSustainabilityMetrics = [
  {
    id: 'co2',
    title: 'Tons of CO₂ Saved',
    icon: <Leaf className="w-10 h-10 text-green-400" />,
    value: 1250,
    isPercentage: false,
    description: "Equivalent to planting over 20,000 trees annually."
  },
  {
    id: 'energy',
    title: 'Energy Efficiency Improvement',
    icon: <Zap className="w-10 h-10 text-yellow-400" />,
    value: 35.75,
    isPercentage: true,
    description: "Achieved through optimized processes and material selection."
  },
  {
    id: 'recycled',
    title: 'Recycled & Smart Materials Used',
    icon: <RecyclingIcon className="w-10 h-10 text-blue-400" />,
    value: 82.5,
    isPercentage: true,
    description: "Reducing waste and enhancing structural performance."
  },
];

export default function Home() {

  const [sustainabilityMetrics, setSustainabilityMetrics] = useState(initialSustainabilityMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
        setSustainabilityMetrics(prevMetrics => 
            prevMetrics.map(metric => {
                let increment;
                if (metric.isPercentage) {
                    increment = Math.random() * 0.1; // Smaller increment for percentages
                } else {
                    increment = Math.random() * 10; // Larger increment for absolute numbers
                }
                return { ...metric, value: metric.value + increment };
            })
        );
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] w-full">
        <BlueprintBackground />
        {homeHeroImage && (
            <Image
                src={homeHeroImage.imageUrl}
                alt={homeHeroImage.description}
                fill
                className="object-cover opacity-20 dark:opacity-10"
                priority
                data-ai-hint={homeHeroImage.imageHint}
                sizes="100vw"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        <div className="relative container max-w-7xl h-full flex flex-col items-start justify-center text-left p-4 md:p-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-md text-foreground">
            Building with Insight,
            <br />
            Integrity, and Innovation.
          </h1>
          <p className="mt-4 max-w-lg text-sm md:text-base text-muted-foreground drop-shadow-sm">
            Your trusted partner in construction consultancy, delivering excellence from concept to completion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 pulse">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-foreground bg-background/50 hover:bg-accent hover:text-accent-foreground">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Core Consultancy Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            We provide a comprehensive range of consultancy services to ensure your project's success at every stage.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service: Service) => {
              const image = PlaceHolderImages.find(p => p.id === service.imageId);
              return (
                <div key={service.title} className="group text-left" style={{ perspective: '1000px' }}>
                    <Card className="bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 overflow-hidden [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                        <div className="[transform:translateZ(40px)]">
                            {image && (
                                <div className="relative aspect-[3/2] overflow-hidden">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={image.imageHint}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                        <CardHeader>
                            <CardTitle className="text-base">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-xs md:text-sm">{service.description}</p>
                        </CardContent>
                        </div>
                    </Card>
                </div>
              )
            })}
          </div>
          <Button asChild variant="link" className="mt-8 text-accent text-base">
            <Link href="/services">Explore All Consultancy Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Metalworks Section */}
      <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
        <div className="container max-w-7xl text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Expert Fabrication &amp; Metalworks</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            From heavy-duty structural steel to intricate ironwork, we provide a full range of metal fabrication services built on a foundation of quality and precision.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {metalServices.map((service) => (
              <div key={service.title} className="group" style={{ perspective: '1000px' }}>
                <Card className="flex flex-col h-full text-left bg-card/80 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                  <div className="[transform:translateZ(40px)] p-4 md:p-6 flex flex-col flex-grow">
                      <CardHeader className="p-0 mb-4">
                          <div className="flex items-center gap-4">
                              <div className="bg-accent/10 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                              <CardTitle className="text-base">{service.title}</CardTitle>
                          </div>
                      </CardHeader>
                      <CardContent className="p-0">
                          <p className="text-muted-foreground text-xs md:text-sm">{service.description}</p>
                      </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <Button asChild variant="link" className="mt-8 text-accent text-base">
            <Link href="/metalworks">Discover Our Metalworks <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Gallery Highlights Section */}
      <section className="py-16 md:py-24 bg-transparent relative">
        <BlueprintBackground />
        <div className="container max-w-7xl text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Gallery Highlights</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            A glimpse into the quality and craftsmanship that define our work.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {galleryImages.slice(0, 4).map((galleryItem) => {
              const image = PlaceHolderImages.find(p => p.id === galleryItem.imageId);
              return (
                <div key={galleryItem.id} className="group" style={{ perspective: '1000px' }}>
                  <Card 
                    className="overflow-hidden transition-all duration-500 bg-card [transform-style:preserve-3d]"
                    style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}
                  >
                    <div className="relative aspect-[3/4]">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4 text-center">
                        <h3 className="text-lg font-semibold text-white drop-shadow-md">{galleryItem.title}</h3>
                        {image && <p className="mt-2 text-sm text-white/80">{image.description}</p>}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300"/>
                      <div className="absolute bottom-0 left-0 p-4 group-hover:opacity-0 transition-opacity duration-300">
                        <h3 className="text-lg font-semibold text-white drop-shadow-md">{galleryItem.title}</h3>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <Button asChild variant="link" className="mt-8 text-accent text-base">
            <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
      
      {/* Sustainability Section */}
      <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12 relative">
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Sustainability &amp; Efficiency</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Measuring our commitment to a greener, stronger future.
                 <br />
                <span className="relative flex h-3 w-3 mx-auto mt-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    <span className="ml-4 text-xs text-green-400 uppercase font-bold tracking-wider">live</span>
                </span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sustainabilityMetrics.map((metric) => (
                <div key={metric.id} className="group" style={{ perspective: '1000px' }}>
                    <Card 
                        className="flex flex-col h-full bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 [transform-style:preserve-3d] border-t-2 border-green-500/50"
                        style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}
                    >
                        <div className="[transform:translateZ(40px)] p-4 md:p-6 flex flex-col flex-grow text-center items-center">
                            <CardHeader className="p-0 flex-shrink-0 mb-4 items-center">
                                <div className="p-4 rounded-full bg-background mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {metric.icon}
                                </div>
                                <CardTitle className="text-lg md:text-xl text-primary">{metric.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-grow flex flex-col justify-center items-center">
                                <Counter end={metric.value} isPercentage={metric.isPercentage} />
                                <p className="mt-4 text-muted-foreground text-xs">{metric.description}</p>
                            </CardContent>
                        </div>
                    </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/analytics">
                  <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  View Full Analytics
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="group" style={{ perspective: '1000px' }}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary [transform:translateZ(40px)]">Why Choose KAWADY?</h2>
                <p className="mt-4 text-muted-foreground [transform:translateZ(40px)]">
                    With decades of combined experience, our team brings unparalleled expertise and a commitment to quality that sets us apart.
                </p>
                <ul className="mt-8 space-y-4 why-choose-us-list">
                    <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-primary">Expert Team</h3>
                        <p className="text-muted-foreground text-sm">Our certified professionals are leaders in their respective fields.</p>
                    </div>
                    </li>
                    <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-primary">Client-Centric Approach</h3>
                        <p className="text-muted-foreground text-sm">We tailor our services to your unique project needs and goals.</p>
                    </div>
                    </li>
                    <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-primary">Proven Track Record</h3>
                        <p className="text-muted-foreground text-sm">A history of successful projects and satisfied clients speaks for itself.</p>
                    </div>
                    </li>
                </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg group" style={{ perspective: '1000px' }}>
              {aboutMainImage && (
                <div className="relative aspect-[4/3] [transform-style:preserve-3d]" style={{ transform: 'rotateY(var(--y-angle, 0)) rotateX(var(--x-angle, 0))' }}>
                  <Image
                      src={aboutMainImage.imageUrl}
                      alt={aboutMainImage.description}
                      fill
                      className="object-cover [transform:translateZ(-20px)]"
                      data-ai-hint={aboutMainImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/10 relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Ready to Start Your Next Project?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Let's build something great together. Get in touch to discuss your requirements or request a detailed quotation.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
