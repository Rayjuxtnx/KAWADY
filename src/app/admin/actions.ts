'use server';

import { revalidatePath } from 'next/cache';
import { writeFile, stat, mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';

const imageDir = join(process.cwd(), 'public/images');
const placeholderDataPath = join(process.cwd(), 'src/lib/placeholder-images.json');
const galleryDataPath = join(process.cwd(), 'src/lib/gallery-data.ts');


// Ensure the directory exists.
async function ensureDir(path: string) {
    try {
        await stat(path);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            await mkdir(path, { recursive: true });
        } else {
            console.error('Error checking directory:', error);
            throw error;
        }
    }
}

export async function uploadImage(prevState: any, formData: FormData): Promise<{ message: string; success: boolean; error?: string }> {
    const file = formData.get('image') as File;
    if (!file || file.size === 0) {
        return { success: false, message: "No file selected." };
    }

    if (!file.type.startsWith('image/')) {
        return { success: false, message: "Invalid file type. Please upload an image." };
    }

    try {
        await ensureDir(imageDir);
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '_');
        const path = join(imageDir, filename);
        
        await writeFile(path, buffer);

        revalidatePath('/admin');
        
        return { success: true, message: `Image "${filename}" uploaded successfully.` };

    } catch (e: any) {
        console.error('Upload failed:', e);
        return { success: false, message: "Image upload failed.", error: e.message };
    }
}

export async function getImages(): Promise<string[]> {
    try {
        await ensureDir(imageDir);
        const files = await readdir(imageDir);
        return files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                    .map(file => `/images/${file}`);
    } catch (error) {
        console.error("Could not read image directory:", error);
        return [];
    }
}

export async function verifyPassword(password: string): Promise<boolean> {
    const p = process.env.ADMIN_PASSWORD;
    if (!p) {
        console.warn("ADMIN_PASSWORD environment variable not set. Using default 'kawadyadmin'.");
    }
    return password === (p || 'kawadyadmin');
}

export async function loginAction(prevState: any, formData: FormData): Promise<{ message: string; success: boolean }> {
    const password = formData.get('password') as string;
    
    const isValid = await verifyPassword(password);

    if (!isValid) {
        return { message: 'Incorrect password.', success: false };
    }

    cookies().set('admin-password', password, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });

    revalidatePath('/admin');
    
    return { message: 'Login successful!', success: true };
}


// New action to update the content files
export async function updateContent(prevState: any, formData: FormData): Promise<{ message: string; success: boolean; error?: string }> {
    
    try {
        // --- Update placeholder-images.json ---
        const placeholderData = JSON.parse(formData.get('placeholderData') as string);
        const newPlaceholderContent = JSON.stringify({ placeholderImages: placeholderData }, null, 2);
        await writeFile(placeholderDataPath, newPlaceholderContent, 'utf-8');

        // --- Update gallery-data.ts ---
        const galleryData = JSON.parse(formData.get('galleryData') as string);
        const newGalleryContent = `
import type { GalleryItem } from '@/lib/gallery-data';

export const galleryImages: GalleryItem[] = ${JSON.stringify(galleryData, null, 2)};
`.trim();
        // We need to reformat the exported variable to be a typescript file
        const galleryTsContent = `
export type GalleryItem = {
  id: string;
  title: string;
  imageId: string;
};

// This is the "special place" where you can manage your gallery images.
// Just add new items to this array, making sure the \`imageId\` matches
// an \`id\` in the \`src/lib/placeholder-images.json\` file.
export const galleryImages: GalleryItem[] = ${JSON.stringify(galleryData, null, 2)};
`;
        await writeFile(galleryDataPath, galleryTsContent, 'utf-8');

        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/gallery');
        revalidatePath('/about');
        // Revalidate all pages that might use these images
        
        return { success: true, message: 'Content updated successfully!' };
    } catch(e: any) {
        console.error('Content update failed:', e);
        return { success: false, message: 'Failed to update content files.', error: e.message };
    }
}
