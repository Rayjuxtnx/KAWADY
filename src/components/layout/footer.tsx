
import Link from 'next/link';
import { Home, Briefcase, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="h-6 w-6" /> },
  { href: '/services', label: 'Services', icon: <Briefcase className="h-6 w-6" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-6 w-6" /> },
];

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { href: 'https://twitter.com', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-accent/20 bg-card/30 backdrop-blur-xl mt-auto">
      <div className="container max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Main App-like Navigation */}
          <div className="flex justify-center items-center gap-8 md:gap-12">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors">
                {link.icon}
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border/50 my-6" />

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-6 text-xs text-muted-foreground text-center">
              <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
              <p className="mt-1">Designed by Philip | <Link href="/terms" className="hover:text-accent">Terms</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
