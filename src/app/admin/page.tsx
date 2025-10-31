
import { cookies } from 'next/headers';
import { getImages, verifyPassword } from './actions';
import { ImageUploader } from './image-uploader';
import { Login } from './login';
import { ContentManager } from './content-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { promises as fs } from 'fs';
import path from 'path';

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { GalleryItem } from '@/lib/gallery-data';


export const metadata = {
    title: 'Admin Dashboard',
    robots: 'noindex, nofollow',
};

async function getPlaceholderData(): Promise<ImagePlaceholder[]> {
    const filePath = path.join(process.cwd(), 'src/lib/placeholder-images.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.placeholderImages;
}

async function getGalleryData(): Promise<GalleryItem[]> {
    const filePath = path.join(process.cwd(), 'src/lib/gallery-data.ts');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Use a regex to safely extract the JSON array string
    const match = fileContent.match(/const galleryImages: GalleryItem\[\] = (\[[\s\S]*?\]);/);
    
    if (!match || !match[1]) {
        console.error("Could not parse gallery-data.ts. Array not found or malformed.");
        return [];
    }

    try {
        // Parse the extracted string as JSON
        return JSON.parse(match[1]);
    } catch (e) {
        console.error("Failed to parse gallery data JSON:", e);
        return [];
    }
}


export default async function AdminPage() {
    const cookieStore = cookies();
    const password = cookieStore.get('admin-password')?.value || '';
    const isAuthenticated = await verifyPassword(password);

    if (!isAuthenticated) {
        return <Login />;
    }
    
    // Fetch all necessary data on the server
    const uploadedImages = await getImages();
    const placeholderData = await getPlaceholderData();
    const galleryData = await getGalleryData();


    return (
        <div className="container max-w-7xl py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>

            <Tabs defaultValue="uploader">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="uploader">Image Uploader</TabsTrigger>
                    <TabsTrigger value="content">Content Manager</TabsTrigger>
                </TabsList>
                <TabsContent value="uploader" className="mt-6">
                     <ImageUploader initialImages={uploadedImages} />
                </TabsContent>
                <TabsContent value="content" className="mt-6">
                    <ContentManager 
                        initialPlaceholders={placeholderData}
                        initialGalleryItems={galleryData}
                        availableImages={uploadedImages}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
