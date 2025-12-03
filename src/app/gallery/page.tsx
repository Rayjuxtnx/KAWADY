import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { galleryImages } from '@/lib/gallery-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Gallery - Custom Metalwork, Steel Fabrication & Industrial Projects | KAWADY',
  description: 'Explore KAWADY Mildsteel Consultants Ltd gallery: high-quality metalwork, steel fabrication, precision welding, industrial construction projects, and custom designs. View images of our structural steel projects, architectural metalwork, and engineered fabrications.',
  keywords: 'metalwork gallery, steel fabrication, precision welding, structural steel projects, custom metal design, industrial metalworks, architectural metalwork, engineered fabrications, KAWADY projects, craftsmanship, workshop gallery, mild steel art, fabricated steel designs',
};

export default function GalleryPage() {
  return (
    <div className="fade-in">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-7xl relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Our Metalwork & Steel Fabrication Gallery
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              Browse our gallery to see the precision, quality, and artistry of KAWADY Mildsteel Consultants Ltd. Explore intricate metalworks, large-scale steel constructions, custom designs, structural projects, engineered fabrications, and expertly crafted industrial solutions.
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
                          alt={`${galleryItem.title} - ${image.description} | custom metalwork, steel fabrication, industrial projects, KAWADY`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-lg font-semibold text-white drop-shadow-md">
                          {galleryItem.title} | Metalwork & Steel Design
                        </h3>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Optional SEO snippet */}
          <div className="mt-12 text-center max-w-3xl mx-auto text-muted-foreground">
            <p>
              Discover more of our custom steel fabrication, precision welding, industrial metal projects, and architectural metalwork. KAWADY delivers quality craftsmanship, innovative designs, and engineered solutions for both residential and commercial projects.
            </p>
          </div>

        </div>
      </section>

      {/* Optional JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "KAWADY Metalwork and Steel Fabrication Gallery",
        "description": "Gallery of high-quality custom metalwork, structural steel projects, precision welding, and industrial designs by KAWADY Mildsteel Consultants Ltd.",
        "url": "https://kawady.com/gallery"
      })}} />
    </div>
  );
}
