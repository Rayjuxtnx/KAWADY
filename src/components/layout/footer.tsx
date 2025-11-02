
import Link from 'next/link';
import { Home, Briefcase, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlueprintBackground } from './blueprint-background';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '/services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { href: 'https://twitter.com', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-accent/20 bg-transparent mt-auto overflow-hidden">
      <BlueprintBackground />
      <div className="container max-w-7xl py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center space-y-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="animate-circle-loop"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#glow-gradient-footer)"
                    strokeWidth="8"
                    fill="none"
                />
                </svg>
                <svg width="0" height="0">
                <defs>
                    <linearGradient id="glow-gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
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
          
          {/* Main App-like Navigation */}
          <div className="flex justify-center items-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors">
                {link.icon}
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <Link 
                key={social.label} 
                href={social.href} 
                className={cn(
                  "text-muted-foreground hover:text-accent transition-colors animate-icon-glow",
                  `delay-${index + 1}`
                )}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-border/20 text-xs text-muted-foreground text-center w-full">
              <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
              <div className="mt-1 flex items-center justify-center gap-x-2">
                <Button variant="link" size="sm" className="px-1 h-auto text-xs" asChild>
                  <a href="https://philip-portfolio.com" target="_blank" rel="noopener noreferrer">Designed by Philip</a>
                </Button>
                <span>|</span>
                <Link href="/terms" className="hover:text-accent">Terms</Link>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
