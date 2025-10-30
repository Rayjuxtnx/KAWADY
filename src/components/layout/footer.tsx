
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlueprintBackground } from './blueprint-background';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { href: '#', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-accent/20 bg-background/95 relative overflow-hidden">
      <BlueprintBackground />
      <div className="container max-w-7xl py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center gap-4 md:gap-6">
            
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center gap-2 mb-2">
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
              <span className="text-xl font-bold animate-multi-color-text-glow" style={{animationDelay: '0s', animationIterationCount: 'infinite'}}>KAWADY</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground text-center">
              Building with Insight, Integrity, and Innovation.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
                {link.label}
            </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-2">
            {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground mt-4 text-center">
            <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
            <p className="mt-1">Designed by Philip</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
