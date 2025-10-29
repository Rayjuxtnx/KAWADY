
import Link from 'next/link';
import { Hammer, Facebook, Twitter, Linkedin } from 'lucide-react';

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
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Hammer className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">KAWADY</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Building with Insight, Integrity, and Innovation.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center">
             <h3 className="text-sm font-semibold text-primary mb-4">Quick Links</h3>
             <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
                >
                    {link.label}
                </Link>
                ))}
            </nav>
          </div>

          {/* Column 3: Social and Legal */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <h3 className="text-sm font-semibold text-primary mb-4">Connect With Us</h3>
             <div className="flex justify-center space-x-4 mb-4">
                {socialLinks.map((social) => (
                    <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent transition-colors">
                        {social.icon}
                        <span className="sr-only">{social.label}</span>
                    </Link>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
