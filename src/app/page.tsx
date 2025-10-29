
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Flame, Wrench, Gem } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service } from '@/lib/services';
import { services } from '@/lib/services';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { useTheme } from 'next-themes';

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

const initialMetalDistributionData = [
  { continent: 'Africa', Steel: 4000 },
  { continent: 'Asia', Steel: 9500 },
  { continent: 'Europe', Steel: 6800 },
  { continent: 'N. America', Steel: 7200 },
  { continent: 'S. America', Steel: 3500 },
  { continent: 'Oceania', Steel: 1500 },
];

const PIE_COLORS = [
    'hsl(45, 100%, 50%)', // Gold
    'hsl(210, 70%, 55%)', // Blue
    'hsl(340, 82%, 60%)', // Pink
    'hsl(160, 70%, 45%)', // Teal
    'hsl(260, 70%, 65%)', // Purple
    'hsl(10, 80%, 55%)',  // Orange
];

const chartConfig = {
    Steel: { label: "Steel" }, // Simplified as we use Cell for colors
};

export default function Home() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#A1A1AA' : '#71717A';

  const [barData, setBarData] = useState(initialMetalDistributionData);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarData(currentData =>
        currentData.map(item => ({
          ...item,
          Steel: Math.max(1000, item.Steel + (Math.random() - 0.5) * 2500),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <BlueprintBackground />
        {homeHeroImage && (
            <Image
                src={homeHeroImage.imageUrl}
                alt={homeHeroImage.description}
                fill
                className="object-cover opacity-20 dark:opacity-10"
                priority
                data-ai-hint={homeHeroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        <div className="relative container max-w-7xl h-full flex flex-col items-start justify-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md text-foreground">
            Building with Insight,
            <br />
            Integrity, and Innovation.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground drop-shadow-sm">
            Your trusted partner in construction consultancy, delivering excellence from concept to completion.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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
          <h2 className="text-3xl font-bold text-primary">Our Core Consultancy Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            We provide a comprehensive range of consultancy services to ensure your project's success at every stage.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service: Service) => {
              const image = PlaceHolderImages.find(p => p.id === service.imageId);
              return (
                <Card key={service.title} className="group text-left bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 overflow-hidden">
                    {image && (
                        <div className="relative aspect-[3/2] overflow-hidden">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                  <CardHeader>
                    <CardTitle className="text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Button asChild variant="link" className="mt-8 text-accent text-base">
            <Link href="/services">Explore All Consultancy Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Metalworks Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-primary">Expert Fabrication & Metalworks</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            From heavy-duty structural steel to intricate ironwork, we provide a full range of metal fabrication services built on a foundation of quality and precision.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
            {metalServices.map((service) => (
              <Card key={service.title} className="group text-left bg-card/80 transition-all duration-700 hover:shadow-xl hover:shadow-accent/30 backdrop-blur-sm hover:[transform:rotateY(360deg)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <CardTitle className="text-primary">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild variant="link" className="mt-8 text-accent text-base">
            <Link href="/metalworks">Discover Our Metalworks <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
      
      {/* Live Analytics Preview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary">Live Market Data</h2>
              <p className="mt-4 text-muted-foreground">
                We monitor global metal markets in real-time to provide our clients with the most current pricing and supply chain insights. This live data empowers you to make informed decisions for your projects.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/analytics">
                  <span className="inline-block bg-green-500 rounded-full w-3 h-3 mr-2 pulse"></span>
                  View Live Analytics
                </Link>
              </Button>
            </div>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer>
                    <BarChart data={barData} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                        <XAxis dataKey="continent" stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} tickLine={{ stroke: tickColor }} axisLine={false} />
                        <YAxis stroke={tickColor} tick={{ fill: tickColor, fontSize: 12 }} tickLine={{ stroke: tickColor }} axisLine={false} />
                        <Bar dataKey="Steel" radius={[4, 4, 0, 0]}>
                            {barData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary">Why Choose KAWADY?</h2>
              <p className="mt-4 text-muted-foreground">
                With decades of combined experience, our team brings unparalleled expertise and a commitment to quality that sets us apart.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Expert Team</h3>
                    <p className="text-muted-foreground">Our certified professionals are leaders in their respective fields.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Client-Centric Approach</h3>
                    <p className="text-muted-foreground">We tailor our services to your unique project needs and goals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Proven Track Record</h3>
                    <p className="text-muted-foreground">A history of successful projects and satisfied clients speaks for itself.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/10 relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl text-center relative">
          <h2 className="text-3xl font-bold text-primary">Ready to Start Your Next Project?</h2>
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
