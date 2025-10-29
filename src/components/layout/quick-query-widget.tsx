
'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Bot, Send, X, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { submitQuickQuery } from '@/app/contact/actions';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
      <span className="ml-2">{pending ? 'Sending...' : 'Send Message'}</span>
    </Button>
  );
}

export function QuickQueryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(submitQuickQuery, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Message Sent!',
          description: state.message,
        });
        formRef.current?.reset();
        setIsOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
  }, [state]);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-50"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Open Quick Query</span>
        <Bot className="h-8 w-8" />
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="sm:max-w-xl mx-auto rounded-t-lg">
          <SheetHeader>
            <SheetTitle>Quick Query</SheetTitle>
            <SheetDescription>
              Have a question? Send us a quick message and we'll get back to you.
            </SheetDescription>
          </SheetHeader>
          <form ref={formRef} action={formAction} className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="qq-name" className="text-sm font-medium">Name</label>
              <Input id="qq-name" name="name" placeholder="John Doe" required />
              {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="qq-email" className="text-sm font-medium">Email</label>
              <Input id="qq-email" name="email" type="email" placeholder="you@example.com" required />
              {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
               <label htmlFor="qq-message" className="text-sm font-medium">Message</label>
              <Textarea id="qq-message" name="message" placeholder="How can we help?" required className="min-h-[100px]" />
              {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
            </div>
            <SheetFooter>
              <SubmitButton />
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
