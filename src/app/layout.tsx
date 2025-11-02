
'use client';

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
import { WeldingGlowBackground } from '@/components/layout/welding-glow-background';
import { useState, useRef, useEffect } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const handleMouseMove = (e: React.MouseEvent<HTMLBodyElement>) => {
        if (window.innerWidth < 768) return; // Disable effect on mobile
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Top-tier mild steel consultancy in Kenya. We specialize in WPS development, structural integrity analysis, root cause failure analysis, on-site fabrication audits, and expert metalworks. Your trusted partner for quality, safety, and efficiency in steel construction." />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <title>KAWADY Mildsteel Consultants Ltd | Expert Welding & Fabrication</title>
        <meta name="keywords" content="mild steel consultancy Kenya,welding procedure specification,WPS development,fabrication process optimization,structural steel design,metalworks Nairobi,on-site welding audit,root cause failure analysis,material selection advisory,cost estimation steel projects,site supervision construction,feasibility studies engineering,custom metal fabrication,artistic ironwork,corrosion prevention steel,technical staff training welding,supplier quality verification,mild steel expert,structural integrity analysis,construction consultancy,project management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={cn("font-body antialiased bg-transparent text-foreground overflow-x-hidden", poppins.variable)}
        onMouseMove={handleMouseMove}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WeldingGlowBackground />
          <PreLoader />
          <WelcomeModal />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </div>
          <QuickQueryWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
