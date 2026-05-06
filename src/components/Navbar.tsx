'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/devis', label: 'Tarifs' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F0EB]/90 backdrop-blur-md border-b border-[#E5DDD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-[#C45C26] font-bold text-xl tracking-tight">TransMaroc</span>
            <span className="text-[#6B6B6B] text-[10px] tracking-[0.15em] uppercase font-medium">France — Maroc</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!loading && user && (
              <Link
                href="/dashboard"
                className="text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!loading && user ? (
              <button
                onClick={handleLogout}
                className="text-[#6B6B6B] text-sm font-medium hover:text-[#1A1A1A] transition-colors"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                href="/login"
                className="text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              >
                Connexion
              </Link>
            )}

            <Link
              href="/devis"
              className="bg-[#C45C26] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#A64A1D] transition-colors shadow-sm"
            >
              Créer un envoi
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#1A1A1A]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5DDD4] px-4 py-6 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!loading && user && (
            <Link
              href="/dashboard"
              className="block text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!loading && user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="block text-[#6B6B6B] text-sm font-medium"
            >
              Déconnexion
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-[#1A1A1A] text-sm font-medium hover:text-[#C45C26] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Connexion
            </Link>
          )}
          <Link
            href="/devis"
            className="block bg-[#C45C26] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-[#A64A1D] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Créer un envoi
          </Link>
        </div>
      )}
    </nav>
  );
}
