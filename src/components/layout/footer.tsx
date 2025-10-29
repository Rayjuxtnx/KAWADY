
import Link from 'next/link';
import { Hammer, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-accent">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
              <Hammer className="h-7 w-7 text-accent" />
              <span className="text-2xl font-bold">KAWADY</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 mt-1">
              Building with Insight, Integrity, and Innovation.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">About</Link>
            <Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">Services</Link>
            <Link href="/projects" className="text-primary-foreground/80 hover:text-accent transition-colors">Projects</Link>
            <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><span className="sr-only">Facebook</span><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></Link>
          </div>

        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved. | <Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
