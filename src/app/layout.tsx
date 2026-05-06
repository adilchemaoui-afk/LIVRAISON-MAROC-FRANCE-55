import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'TransMaroc — Livraison de colis France · Maroc',
  description: 'Vos colis au Maroc, sans friction. De la France vers toutes les villes du Maroc. Tarifs au kilo transparents, suivi GPS temps réel.',
  keywords: ['livraison', 'colis', 'France', 'Maroc', 'transport', 'logistique', 'expédition'],
  openGraph: {
    title: 'TransMaroc — Livraison de colis France · Maroc',
    description: 'Vos colis au Maroc, sans friction. Tarifs transparents, suivi GPS temps réel.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className + ' min-h-screen flex flex-col bg-[#F5F0EB]'}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
