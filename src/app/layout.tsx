
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
import { WelcomeModal } from '@/components/layout/welcome-modal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const metadata: Metadata = {
  title: {
    default: 'KAWADY Mildsteel Consultants Ltd | Expert Welding & Fabrication',
    template: '%s | KAWADY Mildsteel Consultants Ltd',
  },
  description: 'Top-tier mild steel consultancy in Kenya. We specialize in WPS development, structural integrity analysis, root cause failure analysis, on-site fabrication audits, and expert metalworks. Your trusted partner for quality, safety, and efficiency in steel construction.',
  keywords: [
    'mild steel consultancy Kenya',
    'welding procedure specification',
    'WPS development',
    'fabrication process optimization',
    'structural steel design',
    'metalworks Nairobi',
    'on-site welding audit',
    'root cause failure analysis',
    'material selection advisory',
    'cost estimation steel projects',
    'site supervision construction',
    'feasibility studies engineering',
    'custom metal fabrication',
    'artistic ironwork',
    'corrosion prevention steel',
    'technical staff training welding',
    'supplier quality verification',
    'mild steel expert',
    'structural integrity analysis',
    'construction consultancy',
    'project management'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const handleMouseMove = (e: React.MouseEvent<HTMLBodyElement>) => {
    const cards = document.querySelectorAll('.group[style*="perspective:1000px"]') as NodeListOf<HTMLDivElement>;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const rotateX = (y / height - 0.5) * -20; // -10 to 10 deg
        const rotateY = (x / width - 0.5) * 20;   // -10 to 10 deg

        const cardInner = card.querySelector(':scope > [style*="[transform-style:preserve-3d]"]') as HTMLElement || card.firstElementChild as HTMLElement;
        if (cardInner) {
          cardInner.style.setProperty('--x-angle', `${rotateX.toFixed(2)}deg`);
          cardInner.style.setProperty('--y-angle', `${rotateY.toFixed(2)}deg`);
        }
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
          <WelcomeModal />
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

    