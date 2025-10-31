'use client';

import { useActionState, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage, getImages } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoaderCircle, Copy, Check } from 'lucide-react';
import Image from 'next/image';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            Upload Image
        </Button>
    );
}
// This needs to be a separate hook because useFormStatus is not available in React 19 useActionState
import { useFormStatus } from 'react-dom';


export function ImageUploader({ initialImages }: { initialImages: string[] }) {
    const [state, formAction] = useActionState(uploadImage, { success: false, message: "" });
    const { toast } = useToast();
    const [images, setImages] = useState(initialImages);
    const [copiedPath, setCopiedPath] = useState('');

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
            if (state.success) {
                // Refresh the image list on successful upload
                getImages().then(setImages);
            }
        }
    }, [state, toast]);

    const handleCopy = (path: string) => {
        navigator.clipboard.writeText(path).then(() => {
            setCopiedPath(path);
            toast({ title: 'Path Copied!', description: path });
            setTimeout(() => setCopiedPath(''), 2000);
        });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Image Uploader</CardTitle>
                    <CardDescription>Upload new images to the `public/images` directory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div>
                            <Input id="image" name="image" type="file" required accept="image/*" />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Uploaded Images</CardTitle>
                    <CardDescription>Images available in `public/images`. Click path to copy.</CardDescription>
                </CardHeader>
                <CardContent>
                    {images.length === 0 ? (
                        <p>No images uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map(imagePath => (
                                <div key={imagePath} className="group relative">
                                    <Card className="overflow-hidden">
                                        <div className="aspect-square relative">
                                            <Image src={imagePath} alt={imagePath} fill className="object-cover" />
                                        </div>
                                        <div className="p-2 text-xs text-center bg-muted">
                                            <p className="truncate">{imagePath.split('/').pop()}</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full mt-1 h-8"
                                                onClick={() => handleCopy(imagePath)}
                                            >
                                                {copiedPath === imagePath ? <Check className="text-green-500" /> : <Copy />}
                                                <span className="ml-2">Copy Path</span>
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}