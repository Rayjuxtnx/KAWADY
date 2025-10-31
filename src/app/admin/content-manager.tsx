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
        <Button type="submit" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            {pending ? 'Updating...' : children}
        </Button>
    )
}

function UploadAndReplaceAction({ placeholderId, onUploadComplete }: { placeholderId: string, onUploadComplete: (id: string, path: string) => void }) {
    const [state, formAction] = useActionState(uploadImage, { success: false, message: "" });
    const { pending } = useFormStatus();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.success && state.path) {
            onUploadComplete(placeholderId, state.path);
             if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [state, placeholderId, onUploadComplete]);
    
    return (
        <form action={formAction}>
            <div className="flex items-center gap-2">
                <Input
                    id={`upload-${placeholderId}`}
                    name="image"
                    type="file"
                    className="flex-grow text-xs h-9"
                    ref={fileInputRef}
                    required
                    accept="image/*"
                />
                <Button type="submit" size="sm" variant="secondary" disabled={pending}>
                    {pending ? <LoaderCircle className="animate-spin" /> : <Upload />}
                    <span className="ml-2 hidden sm:inline">Upload & Replace</span>
                </Button>
            </div>
             {state.message && !state.success && <p className="text-xs text-destructive mt-1">{state.message}</p>}
        </form>
    );
}

export function ContentManager({ initialPlaceholders, initialGalleryItems }: ContentManagerProps) {
    const [state, formAction] = useActionState(updateContent, { success: false, message: "" });
    const { toast } = useToast();

    const [placeholders, setPlaceholders] = useState<ImagePlaceholder[]>(initialPlaceholders);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);

    const handlePlaceholderChange = (id: string, field: keyof ImagePlaceholder, value: string) => {
        setPlaceholders(current =>
            current.map(p => (p.id === id ? { ...p, [field]: value } : p))
        );
    };
    
    const handleUploadComplete = (id: string, path: string) => {
        handlePlaceholderChange(id, 'imageUrl', path);
        toast({
            title: "Image Replaced!",
            description: `"${id}" is now using the new image. Remember to click "Update Content" to save.`,
        });
    };

    const handleGalleryItemChange = (id: string, field: keyof GalleryItem, value: string) => {
        setGalleryItems(current =>
            current.map(g => (g.id === id ? { ...g, [field]: value } : g))
        );
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
                                                <UploadAndReplaceAction placeholderId={p.id} onUploadComplete={handleUploadComplete} />
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
