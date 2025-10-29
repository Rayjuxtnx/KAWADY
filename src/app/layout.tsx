
'use client'

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { QuickQueryWidget } from '@/components/layout/quick-query-widget';
import { PreLoader } from '@/components/layout/pre-loader';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const metadata: Metadata = {
  title: {
    default: 'KAWADY mildsteel consultants Ltd | Building with Insight, Integrity, and Innovation',
    template: '%s | KAWADY mildsteel consultants Ltd',
  },
  description: 'Expert consultancy for project management, cost estimation, structural design, and more. We build your vision with precision and trust.',
  keywords: ['construction consultancy', 'project management', 'cost estimation', 'structural consultancy', 'site supervision', 'feasibility studies'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const handleMouseMove = (e: React.MouseEvent<HTMLBodyElement>) => {
    const cards = document.querySelectorAll('.group[class*="[transform-style:preserve-3d]"]') as NodeListOf<HTMLDivElement>;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const rotateX = (y / height - 0.5) * -20; // -10 to 10 deg
        const rotateY = (x / width - 0.5) * 20;   // -10 to 10 deg

        card.style.setProperty('--x-angle', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--y-angle', `${rotateY.toFixed(2)}deg`);
    });
  };
  
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title?.default)}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="keywords" content={metadata.keywords?.join(', ')} />
      </head>
      <body 
        className={cn("font-body antialiased bg-background text-foreground", poppins.variable)}
        onMouseMove={handleMouseMove}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PreLoader />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <QuickQueryWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
