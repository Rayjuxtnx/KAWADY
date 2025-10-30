
'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Bot } from 'lucide-react';
import { Button } from '../ui/button';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown before in this session
    const hasBeenShown = sessionStorage.getItem('welcomeModalShown');
    if (!hasBeenShown) {
      // Delay showing the modal to let the preloader finish
      const showTimer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcomeModalShown', 'true');
      }, 2500); // Show after preloader

      return () => clearTimeout(showTimer);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-card/80 backdrop-blur-xl border-accent/30">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent/20">
              <Bot className="h-8 w-8 text-accent" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl text-primary">
            Welcome to KAWADY
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground text-base">
            If you have any online questions, don&apos;t hesitate to ask me. I&apos;m here for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction asChild>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Proceed Now
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
