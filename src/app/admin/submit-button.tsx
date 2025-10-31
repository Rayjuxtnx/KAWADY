'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

export function SubmitButton({ children }: { children?: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            {children || 'Submit'}
        </Button>
    );
}
