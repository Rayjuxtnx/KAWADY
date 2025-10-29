import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { projects } from '@/lib/data';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Browse a selection of completed projects by ConstructLead, showcasing our expertise and commitment to quality across various sectors.',
};

export default function ProjectsPage() {
  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Portfolio</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              We are proud to present a selection of our successfully completed projects. Each one is a testament to our dedication, expertise, and collaborative approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const image = PlaceHolderImages.find(p => p.id === project.imagePlaceholderId);
              return (
                <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-card">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-primary mb-2">{project.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      {project.location}
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
