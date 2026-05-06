import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#B5B5B5] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col leading-tight mb-4">
              <span className="text-[#C45C26] font-bold text-xl tracking-tight">TransMaroc</span>
              <span className="text-[#888] text-[10px] tracking-[0.15em] uppercase font-medium">France — Maroc</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#888]">
              Votre pont logistique entre la France et le Maroc. Livraison de colis, courrier, high-tech et produits du terroir.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Liens utiles</h4>
            <div className="space-y-2.5 text-sm">
              <Link href="/devis" className="block hover:text-[#C45C26] transition-colors">Tarifs & Devis</Link>
              <Link href="/contact" className="block hover:text-[#C45C26] transition-colors">Nous contacter</Link>
              <Link href="/mentions-legales" className="block hover:text-[#C45C26] transition-colors">Mentions légales</Link>
              <Link href="/" className="block hover:text-[#C45C26] transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C45C26]" />
                <span>contact@transmaroc.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C45C26]" />
                <span>07 53 25 68 97</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C45C26]" />
                <span>7 Rue de la Noue, 93170 Bagnolet</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Suivez-nous</h4>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-[#888] hover:text-[#C45C26] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#888] hover:text-[#C45C26] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#888] hover:text-[#C45C26] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666]">
          <p>© {new Date().getFullYear()} TransMaroc SARL. Tous droits réservés.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link href="/mentions-legales" className="hover:text-[#B5B5B5] transition-colors">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-[#B5B5B5] transition-colors">Mentions légales</Link>
            <Link href="/contact" className="hover:text-[#B5B5B5] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
