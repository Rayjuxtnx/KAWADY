
import type { Metadata } from 'next';
import { ProjectGallery } from './project-gallery';
import { projects } from '@/lib/data';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

export const metadata: Metadata = {
  title: 'Project Portfolio - Steel Construction & Fabrication',
  description: 'Browse our portfolio of completed projects. See how KAWADY Mildsteel Consultants Ltd delivers excellence in structural steel, commercial builds, and infrastructure.',
};

export default function ProjectsPage() {
  const locations = [...new Set(projects.map((p) => p.location))];

  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Portfolio</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              We are proud to present a selection of our successfully completed projects. Each one is a testament to our dedication, expertise, and collaborative approach.
            </p>
          </div>
          <ProjectGallery projects={projects} locations={locations} />
        </div>
      </section>
    </div>
  );
}
