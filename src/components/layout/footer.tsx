
import Link from 'next/link';
import { Hammer, Facebook, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { href: '#', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
]

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t-2 border-accent">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Hammer className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-primary">KAWADY</span>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground mb-6">
            Building with Insight, Integrity, and Innovation.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center space-x-6 mb-6">
            {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                </Link>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
            <Link href="/terms" className="hover:text-accent underline underline-offset-4">
                Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
