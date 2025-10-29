
'use client';

import React, { useState, useRef, useEffect, useActionState } from 'react';
import { siteExpert } from '@/ai/flows/site-expert-flow';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Hammer } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const initialState: { messages: Message[], error?: string } = {
  messages: [],
  error: undefined
};

async function handleAction(state: { messages: Message[] }, formData: FormData): Promise<{ messages: Message[] }> {
  const prompt = formData.get('prompt') as string;
  if (!prompt) return state;

  const userMessage: Message = { role: 'user', text: prompt };
  const newMessages: Message[] = [...state.messages, userMessage];

  const botResponse = await siteExpert(prompt);
  const botMessage: Message = { role: 'bot', text: botResponse };
  
  return { messages: [...newMessages, botMessage] };
}

export function QuickQueryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(handleAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (state.messages.length > 0) {
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
          if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 100);
    }
  }, [state.messages]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when sheet closes
      state.messages = [];
    }
  }, [isOpen, state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formAction(new FormData(e.currentTarget));
    setInput('');
  }

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
        <SheetContent side="bottom" className="sm:max-w-xl mx-auto rounded-t-lg h-[80vh] flex flex-col">
          <SheetHeader>
            <SheetTitle>Quick Query Assistant</SheetTitle>
            <SheetDescription>
              Ask K-Bot about our construction and metalwork services.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-grow my-4 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {state.messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'bot' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot size={20}/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'p-3 rounded-lg max-w-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot size={20}/>
                      </AvatarFallback>
                    </Avatar>
                  <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span className="text-sm text-muted-foreground">K-Bot is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-2 py-4 border-t">
              <Input 
                id="prompt" 
                name="prompt" 
                placeholder="Ask about our services..." 
                required 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending || !input}>
                <Send className="h-4 w-4"/>
                <span className="sr-only">Send</span>
              </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
