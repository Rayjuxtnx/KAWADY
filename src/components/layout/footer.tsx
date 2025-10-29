
import Link from 'next/link';
import { BarChartBig, Facebook, Twitter, Linkedin } from 'lucide-react';
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
      <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center gap-6">
            
          {/* Logo and Slogan */}
          <Link href="/" className="flex items-center gap-2 mb-2">
            <BarChartBig className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-primary">KAWADY</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground text-center">
            Building with Insight, Integrity, and Innovation.
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground mt-4">&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
