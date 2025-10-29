
'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle } from 'lucide-react';
import { BlueprintBackground } from '@/components/layout/blueprint-background';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Since we are adding client-side interactivity, we can't export metadata directly from a client component.
// We can set it in the parent layout or keep it static here, but it won't be dynamically used by Next.js in this file.
// For the purpose of this demo, we will remove the metadata export.

export default function AdminPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

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

          <Alert variant="destructive" className="mb-8 bg-destructive/10 border-destructive/30">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Developer Preview Mode</AlertTitle>
            <AlertDescription>
              This is a UI demonstration only. File uploads are not connected to a backend and will not be saved. Previews are local to your browser.
            </AlertDescription>
          </Alert>

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
                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                  {imagePreview && (
                    <div className="mt-4 aspect-video relative rounded-md overflow-hidden border">
                      <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                    </div>
                  )}
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
                    <Input id="video-upload" type="file" accept="video/*" onChange={handleVideoChange} />
                  </div>
                  {videoPreview && (
                    <div className="mt-4 aspect-video relative rounded-md overflow-hidden border">
                      <video src={videoPreview} controls className="w-full h-full object-contain bg-black" />
                    </div>
                  )}
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
