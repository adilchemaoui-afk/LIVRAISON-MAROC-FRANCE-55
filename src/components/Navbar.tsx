'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Package, Phone, Mail, MapPin } from 'lucide-react';
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

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <Package className="w-6 h-6" />
            <span>Transport Maroc 2</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-200 transition">Accueil</Link>
            <Link href="/devis" className="hover:text-gray-200 transition">Devis</Link>
            <Link href="/contact" className="hover:text-gray-200 transition">Contact</Link>
            {!loading && user ? (
              <>
                <Link href="/dashboard" className="hover:text-gray-200 transition">Mon espace</Link>
                <button onClick={handleLogout} className="hover:text-gray-200 transition">Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-200 transition">Connexion</Link>
                <Link href="/register" className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Inscription
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-blue-800 px-4 py-4 space-y-3">
          <Link href="/" className="block hover:text-gray-200" onClick={() => setMobileOpen(false)}>Accueil</Link>
          <Link href="/devis" className="block hover:text-gray-200" onClick={() => setMobileOpen(false)}>Devis</Link>
          <Link href="/contact" className="block hover:text-gray-200" onClick={() => setMobileOpen(false)}>Contact</Link>
          {!loading && user ? (
            <>
              <Link href="/dashboard" className="block hover:text-gray-200" onClick={() => setMobileOpen(false)}>Mon espace</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block hover:text-gray-200">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block hover:text-gray-200" onClick={() => setMobileOpen(false)}>Connexion</Link>
              <Link href="/register" className="block bg-accent text-white px-4 py-2 rounded-md" onClick={() => setMobileOpen(false)}>Inscription</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
