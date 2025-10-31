'use client';

import { useActionState, useState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { updateContent, uploadImage } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { LoaderCircle, Upload } from 'lucide-react';


import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { GalleryItem } from '@/lib/gallery-data';

type ContentManagerProps = {
    initialPlaceholders: ImagePlaceholder[];
    initialGalleryItems: GalleryItem[];
};

function ContentSubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} name="intent" value="updateContent">
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            {pending ? 'Updating...' : children}
        </Button>
    )
}

function UploadButton() {
    const { pending } = useFormStatus();
    return (
         <Button type="submit" size="sm" variant="secondary" disabled={pending} name="intent" value="uploadImage">
            {pending ? <LoaderCircle className="animate-spin" /> : <Upload />}
            <span className="ml-2 hidden sm:inline">Upload & Replace</span>
        </Button>
    )
}


export function ContentManager({ initialPlaceholders, initialGalleryItems }: ContentManagerProps) {
    const [updateState, updateContentAction] = useActionState(updateContent, { success: false, message: "" });
    const [uploadState, uploadImageAction] = useActionState(uploadImage, { success: false, message: "" });
    const { toast } = useToast();

    const [placeholders, setPlaceholders] = useState<ImagePlaceholder[]>(initialPlaceholders);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
    
    // Store refs to file inputs
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    useEffect(() => {
        if (updateState.message) {
            toast({
                title: updateState.success ? "Success!" : "Error",
                description: updateState.message,
                variant: updateState.success ? "default" : "destructive",
            });
        }
    }, [updateState, toast]);
    
    useEffect(() => {
        if (uploadState.success && uploadState.path && uploadState.placeholderId) {
            handlePlaceholderChange(uploadState.placeholderId, 'imageUrl', uploadState.path);
            toast({
                title: "Image Replaced!",
                description: `"${uploadState.placeholderId}" image updated. Remember to click "Update Content" to save.`,
            });
            // Clear the specific file input
            const inputRef = fileInputRefs.current[uploadState.placeholderId];
            if (inputRef) {
                inputRef.value = "";
            }
        } else if (uploadState.message && !uploadState.success) {
             toast({
                title: "Upload Failed",
                description: uploadState.message,
                variant: "destructive",
            });
        }
    }, [uploadState, toast]);

    const handlePlaceholderChange = (id: string, field: keyof ImagePlaceholder, value: string) => {
        setPlaceholders(current =>
            current.map(p => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const handleGalleryItemChange = (id: string, field: keyof GalleryItem, value: string) => {
        setGalleryItems(current =>
            current.map(g => (g.id === id ? { ...g, [field]: value } : g))
        );
    };

    const formAction = (formData: FormData) => {
        const intent = formData.get('intent') as string;
        if (intent === 'uploadImage') {
            uploadImageAction(formData);
        } else {
            updateContentAction(formData);
        }
    };

    return (
        <form action={formAction}>
            <input type="hidden" name="placeholderData" value={JSON.stringify(placeholders)} />
            <input type="hidden" name="galleryData" value={JSON.stringify(galleryItems)} />

            <Card>
                <CardHeader>
                    <CardTitle>Content Manager</CardTitle>
                    <CardDescription>Edit site images and text content. Press "Update Content" at the bottom to save all changes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Accordion type="single" collapsible defaultValue="placeholders">
                        <AccordionItem value="placeholders">
                            <AccordionTrigger className="text-xl font-semibold">Image Placeholders</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                {placeholders.map(p => (
                                    <Card key={p.id} className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-primary">{p.id}</Label>
                                                <div className="relative aspect-video rounded-md overflow-hidden border">
                                                    <Image src={p.imageUrl} alt={p.description} fill className="object-cover" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="hidden"
                                                        name="placeholderId"
                                                        value={p.id}
                                                     />
                                                    <Input
                                                        id={`upload-${p.id}`}
                                                        name="image"
                                                        type="file"
                                                        className="flex-grow text-xs h-9"
                                                        ref={(el) => fileInputRefs.current[p.id] = el}
                                                        accept="image/*"
                                                    />
                                                    <Button formAction={uploadImageAction} type="submit" size="sm" variant="secondary" name="placeholderId" value={p.id}>
                                                        <Upload className="h-4 w-4" />
                                                        <span className="ml-2 hidden sm:inline">Upload</span>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <div>
                                                    <Label htmlFor={`desc-${p.id}`}>Description</Label>
                                                    <Input id={`desc-${p.id}`} value={p.description} onChange={(e) => handlePlaceholderChange(p.id, 'description', e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`hint-${p.id}`}>AI Hint</Label>
                                                    <Input id={`hint-${p.id}`} value={p.imageHint} onChange={(e) => handlePlaceholderChange(p.id, 'imageHint', e.target.value)} />
                                                </div>
                                                 <div>
                                                    <Label htmlFor={`url-${p.id}`}>Image URL</Label>
                                                    <Input id={`url-${p.id}`} value={p.imageUrl} readOnly disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="gallery">
                            <AccordionTrigger className="text-xl font-semibold">Gallery Items</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                               {galleryItems.map(g => {
                                 const image = placeholders.find(p => p.id === g.imageId);
                                 return (
                                     <Card key={g.id} className="p-4">
                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-primary">{g.id}</Label>
                                                {image && (
                                                    <div className="relative aspect-video rounded-md overflow-hidden border">
                                                        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <Label htmlFor={`imageId-select-${g.id}`} className="text-xs font-medium">Change Image ID</Label>
                                                    <select
                                                        id={`imageId-select-${g.id}`}
                                                        value={g.imageId}
                                                        onChange={(e) => handleGalleryItemChange(g.id, 'imageId', e.target.value)}
                                                        className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                                                    >
                                                        {placeholders.map(p => (
                                                            <option key={p.id} value={p.id}>{p.id}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                             <div className="md:col-span-2 space-y-2">
                                                <div>
                                                    <Label htmlFor={`title-${g.id}`}>Title</Label>
                                                    <Input id={`title-${g.id}`} value={g.title} onChange={(e) => handleGalleryItemChange(g.id, 'title', e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`imageId-${g.id}`}>Image ID</Label>
                                                    <Input id={`imageId-${g.id}`} value={g.imageId} readOnly disabled />
                                                </div>
                                            </div>
                                         </div>
                                     </Card>
                                 )
                               })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <div className="mt-6 flex justify-end">
                <ContentSubmitButton>Update Content</ContentSubmitButton>
            </div>
        </form>
    );
}