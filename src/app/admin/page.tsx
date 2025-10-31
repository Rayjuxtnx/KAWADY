
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

            <Tabs defaultValue="uploader" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="uploader">Image Uploader</TabsTrigger>
                    <TabsTrigger value="content">Content Manager</TabsTrigger>
                </TabsList>
                <TabsContent value="uploader" className="mt-6">
                     <div className="prose prose-sm dark:prose-invert max-w-none mb-6 p-4 bg-muted/50 rounded-lg border">
                        <h3 className="text-lg font-semibold">Workflow Step 1: Upload Images</h3>
                        <p>Use this form to upload new images from your computer to the website's `public/images` directory. Once an image is uploaded, it will appear in the "Uploaded Images" gallery below. You can then go to the "Content Manager" tab to assign it to a specific part of the website.</p>
                     </div>
                     <ImageUploader initialImages={uploadedImages} />
                </TabsContent>
                <TabsContent value="content" className="mt-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none mb-6 p-4 bg-muted/50 rounded-lg border">
                        <h3 className="text-lg font-semibold">Workflow Step 2: Assign Images and Edit Content</h3>
                        <p>Here you can control where your uploaded images appear and edit related text. For each role (e.g., `home-hero`), you can directly upload a new image from your computer, or for gallery items, you can select an Image ID from the dropdown. Remember to click the main "Update Content" button at the very bottom to save all your changes.</p>
                    </div>
                    <ContentManager 
                        initialPlaceholders={placeholderData}
                        initialGalleryItems={galleryData}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
