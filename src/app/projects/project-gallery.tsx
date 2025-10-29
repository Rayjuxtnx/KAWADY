'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { projects as ProjectType } from '@/lib/data';
import { MapPin } from 'lucide-react';

type Project = (typeof ProjectType)[number];

interface ProjectGalleryProps {
  projects: Project[];
  locations: string[];
}

export function ProjectGallery({ projects, locations }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.location === activeFilter);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={activeFilter === 'All' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setActiveFilter('All')}
        >
          All
        </Button>
        {locations.map((location) => (
          <Button
            key={location}
            variant={activeFilter === location ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setActiveFilter(location)}
          >
            {location}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
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
  );
}
