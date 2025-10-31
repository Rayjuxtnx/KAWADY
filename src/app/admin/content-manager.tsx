'use client';

import { useActionState, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateContent } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { SubmitButton } from './submit-button';

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { GalleryItem } from '@/lib/gallery-data';

type ContentManagerProps = {
    initialPlaceholders: ImagePlaceholder[];
    initialGalleryItems: GalleryItem[];
    availableImages: string[];
};

export function ContentManager({ initialPlaceholders, initialGalleryItems, availableImages }: ContentManagerProps) {
    const [state, formAction] = useActionState(updateContent, { success: false, message: "" });
    const { toast } = useToast();

    const [placeholders, setPlaceholders] = useState<ImagePlaceholder[]>(initialPlaceholders);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleGalleryItemChange = (id: string, field: keyof GalleryItem, value: string) => {
        setGalleryItems(current =>
            current.map(g => (g.id === id ? { ...g, [field]: value } : g))
        );
    };

    const handleImageSelect = (id: string, imageUrl: string, type: 'placeholder' | 'gallery') => {
        if (type === 'placeholder') {
            handlePlaceholderChange(id, 'imageUrl', imageUrl);
        } else {
            handleGalleryItemChange(id, 'imageId', imageUrl);
        }
        setIsDialogOpen(false);
    };

    return (
        <form action={formAction}>
            {/* Hidden inputs to pass the JSON data to the server action */}
            <input type="hidden" name="placeholderData" value={JSON.stringify(placeholders)} />
            <input type="hidden" name="galleryData" value={JSON.stringify(galleryItems)} />

            <Card>
                <CardHeader>
                    <CardTitle>Content Manager</CardTitle>
                    <CardDescription>Edit site images and text content. Press "Update Content" at the bottom to save.</CardDescription>
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
                                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="w-full">Change Image</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Select an Image for "{p.id}"</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                                            {availableImages.map(imgSrc => (
                                                                <button key={imgSrc} type="button" onClick={() => handleImageSelect(p.id, imgSrc, 'placeholder')} className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-accent focus:border-accent focus:outline-none">
                                                                    <Image src={imgSrc} alt={imgSrc} fill className="object-cover" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
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
                                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="w-full">Change Image</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Select an Image for "{g.title}"</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                                            {placeholders.map(p => (
                                                                <button key={p.id} type="button" onClick={() => handleImageSelect(g.id, p.id, 'gallery')} className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-accent focus:border-accent focus:outline-none">
                                                                    <Image src={p.imageUrl} alt={p.description} fill className="object-cover" />
                                                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs truncate">{p.id}</div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
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
                <SubmitButton>Update Content</SubmitButton>
            </div>
        </form>
    );
}

// A specific submit button for this form to show loading state
const ContentSubmitButton = ({ children }: { children: React.ReactNode }) => {
    const { pending } = useActionState(updateContent, { success: false });
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Updating...' : children}
        </Button>
    )
}
