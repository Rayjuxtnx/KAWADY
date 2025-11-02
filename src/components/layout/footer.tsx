
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
];

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { href: 'https://twitter.com', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-accent/20 bg-background/50">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2">
               <div className="relative w-8 h-8">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="animate-circle-loop"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#glow-gradient-footer-pro)"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="glow-gradient-footer-pro" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'hsl(210, 70%, 55%)', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold">KAWADY</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Building with Insight, Integrity, and Innovation.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-end">
            <div>
              <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Links</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end">
             <div>
              <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Connect</h3>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((social) => (
                  <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/50 pt-8 text-xs text-muted-foreground text-center">
            <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
            <p className="mt-1">Designed by Philip</p>
        </div>
      </div>
    </footer>
  );
}
