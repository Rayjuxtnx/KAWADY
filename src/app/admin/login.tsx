'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Verifying...' : 'Login'}
        </Button>
    );
}

export function Login() {
    const [state, formAction] = useActionState(loginAction, { message: '', success: false });

    useEffect(() => {
        if (state.success) {
            // Re-renders are handled by revalidatePath in the action
        }
    }, [state.success]);

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
