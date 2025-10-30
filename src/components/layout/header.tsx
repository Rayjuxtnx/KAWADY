
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium text-foreground/60 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground'
      )}
    >
      {children}
    </Link>
  );
};

const DropdownNav = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground hover:bg-transparent px-0">
        {title}
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-48">
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileNavLink = ({ href, children, onNavigate }: { href: string; children: React.ReactNode; onNavigate: () => void }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        'block py-2 text-lg font-medium text-foreground/80 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground font-semibold'
      )}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <div className="relative w-8 h-8">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle
                className="animate-circle-loop"
                cx="50"
                cy="50"
                r="45"
                stroke="url(#glow-gradient-header)"
                strokeWidth="8"
                fill="none"
              />
            </svg>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="glow-gradient-header" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-bold animate-multi-color-text-glow">
            {'KAWADY'.split('').map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <DropdownNav title="Company">
             <DropdownMenuItem asChild><Link href="/about">About Us</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/contact">Contact Us</Link></DropdownMenuItem>
          </DropdownNav>
           <DropdownNav title="What We Do">
             <DropdownMenuItem asChild><Link href="/services">Services</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/metalworks">Metalworks</Link></DropdownMenuItem>
           </DropdownNav>
           <DropdownNav title="Our Work">
             <DropdownMenuItem asChild><Link href="/gallery">Gallery</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/projects">Projects</Link></DropdownMenuItem>
           </DropdownNav>
          <NavLink href="/analytics">Analytics</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">Request a Quote</Link>
            </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95">
          <nav className="container py-8">
            <Accordion type="single" collapsible className="w-full">
              <MobileNavLink href="/" onNavigate={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              
              <AccordionItem value="company" className="border-b-0">
                <AccordionTrigger className="py-2 text-lg font-medium text-foreground/80 hover:no-underline hover:text-foreground">Company</AccordionTrigger>
                <AccordionContent className="pl-4">
                  <MobileNavLink href="/about" onNavigate={() => setIsMenuOpen(false)}>About Us</MobileNavLink>
                  <MobileNavLink href="/contact" onNavigate={() => setIsMenuOpen(false)}>Contact Us</MobileNavLink>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="what-we-do" className="border-b-0">
                <AccordionTrigger className="py-2 text-lg font-medium text-foreground/80 hover:no-underline hover:text-foreground">What We Do</AccordionTrigger>
                <AccordionContent className="pl-4">
                  <MobileNavLink href="/services" onNavigate={() => setIsMenuOpen(false)}>Services</MobileNavLink>
                  <MobileNavLink href="/metalworks" onNavigate={() => setIsMenuOpen(false)}>Metalworks</MobileNavLink>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="our-work" className="border-b-0">
                <AccordionTrigger className="py-2 text-lg font-medium text-foreground/80 hover:no-underline hover:text-foreground">Our Work</AccordionTrigger>
                <AccordionContent className="pl-4">
                  <MobileNavLink href="/gallery" onNavigate={() => setIsMenuOpen(false)}>Gallery</MobileNavLink>
                  <MobileNavLink href="/projects" onNavigate={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
                </AccordionContent>
              </AccordionItem>

              <MobileNavLink href="/analytics" onNavigate={() => setIsMenuOpen(false)}>Analytics</MobileNavLink>
            </Accordion>
            
            <div className="flex items-center gap-4 mt-8">
              <ThemeToggle />
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 flex-grow" size="lg">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Request a Quote</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
