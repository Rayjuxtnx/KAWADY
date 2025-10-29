
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { BlueprintBackground } from '@/components/layout/blueprint-background';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Manage website content.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing the admin page
};

export default function AdminPage() {
  return (
    <div className="fade-in">
      <section className="relative min-h-[calc(100vh-8rem)] py-16 md:py-24 bg-background overflow-hidden">
        <BlueprintBackground />
        <div className="container max-w-4xl relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Admin Panel</h1>
            <p className="mt-4 text-muted-foreground">
              Manage your website's images and videos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Upload Card */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Upload /> Image Management
                </CardTitle>
                <CardDescription>
                  Upload new images for the gallery or project pages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="image-upload" className="sr-only">Choose file</label>
                    <Input id="image-upload" type="file" accept="image/*" />
                  </div>
                  <Button type="submit" className="w-full" disabled>Upload Image</Button>
                   <p className="text-xs text-muted-foreground pt-2">Note: Upload functionality is not yet enabled.</p>
                </form>
              </CardContent>
            </Card>

            {/* Video Upload Card */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Upload /> Video Management
                </CardTitle>
                <CardDescription>
                  Upload new videos for project showcases.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="video-upload" className="sr-only">Choose file</label>
                    <Input id="video-upload" type="file" accept="video/*" />
                  </div>
                  <Button type="submit" className="w-full" disabled>Upload Video</Button>
                  <p className="text-xs text-muted-foreground pt-2">Note: Upload functionality is not yet enabled.</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
