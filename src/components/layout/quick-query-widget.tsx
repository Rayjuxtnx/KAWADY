
'use client';

import React, { useState, useRef, useEffect, useActionState } from 'react';
import { siteExpert } from '@/ai/flows/site-expert-flow';
import { Bot, Send, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

  // The AI call is now handled directly here, making it a real chat interaction
  try {
    const botResponse = await siteExpert(prompt);
    const botMessage: Message = { role: 'bot', text: botResponse };
    return { messages: [...newMessages, botMessage] };
  } catch (error) {
    console.error("Error calling AI expert:", error);
    const errorMessage: Message = { role: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
    return { messages: [...newMessages, errorMessage] };
  }
}

export function QuickQueryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(handleAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Scroll to bottom when new messages are added
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
    // Reset messages when sheet is closed
    if (!isOpen) {
      state.messages = [];
    }
  }, [isOpen, state]);

  useEffect(() => {
    if (!isPending) {
        formRef.current?.reset();
        setInput('');
    }
  }, [isPending]);


  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-center gap-2">
          <Button
            className="h-16 w-16 rounded-full shadow-lg flex items-center justify-center animate-bg-gradient-shift"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
          >
            <Bot className="h-8 w-8 text-white drop-shadow-lg" />
          </Button>
          <p className="text-xs text-center text-accent bg-background/50 px-2 py-1 rounded-full shadow-lg">I am Kawady AI</p>
        </div>
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
            side="bottom" 
            className="sm:max-w-xl mx-auto h-[85vh] md:h-[70vh] flex flex-col p-0 bg-card/80 backdrop-blur-xl border-accent/30 rounded-t-2xl sm:bottom-4 sm:rounded-2xl"
        >
          <SheetHeader className="p-4 md:p-6 pb-4 border-b border-border/50">
            <SheetTitle>Kawady AI Assistant</SheetTitle>
            <SheetDescription>
              Ask me anything about our services.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-grow my-0 px-4 md:px-6" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {state.messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'bot' && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot size={20}/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'p-3 rounded-lg max-w-[80%]',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot size={20}/>
                      </AvatarFallback>
                    </Avatar>
                  <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Kawady AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 md:p-6 pt-2 bg-transparent border-t border-border/50">
            <form ref={formRef} action={formAction} className="flex items-center gap-2">
                <Input 
                  id="prompt" 
                  name="prompt" 
                  placeholder="Ask about welding, estimates..." 
                  required 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isPending}
                  autoComplete="off"
                  className="glow-input"
                />
                <Button type="submit" disabled={isPending || !input.trim()} size="icon" className="flex-shrink-0">
                  <Send className="h-4 w-4"/>
                  <span className="sr-only">Send</span>
                </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
