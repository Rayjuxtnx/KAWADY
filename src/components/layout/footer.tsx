
import Link from 'next/link';
import { Hammer, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Hammer className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">KAWADY</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building with Insight, Integrity, and Innovation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/90">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/metalworks" className="text-sm text-muted-foreground hover:text-accent transition-colors">Metalworks</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/90">Contact Info</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">123 Construction Ave, Metropolis, USA 12345</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <a href="tel:+254722659260" className="text-sm text-muted-foreground hover:text-accent transition-colors">+254 722 659 260</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <a href="mailto:kawadymildsteelconsultants@gmail.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">kawadymildsteelconsultants@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/90">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/20 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KAWADY mildsteel consultants Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
