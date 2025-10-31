'use server';

import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { stat, mkdir, readdir } from 'fs/promises';
import { cookies } from 'next/headers';

const imageDir = join(process.cwd(), 'public/images');

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

    // Basic validation for image type
    if (!file.type.startsWith('image/')) {
        return { success: false, message: "Invalid file type. Please upload an image." };
    }

    try {
        await ensureDir(imageDir);
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const filename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
        const path = join(imageDir, filename);
        
        await writeFile(path, buffer);
        console.log(`File uploaded to ${path}`);

        revalidatePath('/admin'); // Revalidate the admin page to show the new image
        
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
        // Filter for common image extensions
        return files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                    .map(file => `/images/${file}`);
    } catch (error) {
        console.error("Could not read image directory:", error);
        return [];
    }
}

export async function verifyPassword(password: string): Promise<boolean> {
    return password === (process.env.ADMIN_PASSWORD || 'kawadyadmin');
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
