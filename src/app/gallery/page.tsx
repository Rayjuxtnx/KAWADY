
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { galleryImages } from '@/lib/gallery-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Gallery - Custom Metalwork & Steel Fabrication',
  description: 'A showcase of our finest metalwork, precision welding, and structural steel projects. See the quality craftsmanship of KAWADY Mildsteel Consultants Ltd.',
};

export default function GalleryPage() {
  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Work in Pictures</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              Browse our gallery to see the precision, quality, and artistry that defines every KAWADY project, from intricate metalworks to large-scale constructions.
            </p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {galleryImages.map((galleryItem) => {
              const image = PlaceHolderImages.find(p => p.id === galleryItem.imageId);
              return (
                <div key={galleryItem.id} className="break-inside-avoid">
                  <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-accent/40 dark:hover:shadow-accent/20 transition-all duration-300">
                    <div className="relative aspect-[3/4]">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-lg font-semibold text-white drop-shadow-md">{galleryItem.title}</h3>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
