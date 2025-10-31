'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

async function checkPasswordAction(prevState: any, formData: FormData) {
    const password = formData.get('password');
    // In a real app, you'd call a server action to verify the password
    // and set a secure, httpOnly cookie. For this simple case, we use a client-side cookie.
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        window.location.reload(); // Reload to let the server re-render the admin page
        return { message: 'Login successful!', success: true };
    } else {
        return { message: 'Incorrect password.', success: false };
    }
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Verifying...' : 'Login'}
        </Button>
    );
}

export function Login() {
    const [state, formAction] = useActionState(checkPasswordAction, { message: '', success: false });

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Admin Access</CardTitle>
                    <CardDescription>Please enter the password to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        {state?.message && !state.success && (
                             <p className="text-sm font-medium text-destructive">{state.message}</p>
                        )}
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
