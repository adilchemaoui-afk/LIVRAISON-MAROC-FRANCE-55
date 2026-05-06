import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Transport Maroc 2</h3>
            <p className="text-sm mb-4">
              Votre pont logistique entre le Maroc et la France. Transport de colis, lettres, high-tech et produits du terroir.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>adc.lecolibri@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>07 53 25 68 97</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>7 Rue de la Noue, 93170 Bagnolet, France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liens utiles</h3>
            <div className="space-y-2 text-sm">
              <Link href="/devis" className="block hover:text-white transition">Demander un devis</Link>
              <Link href="/contact" className="block hover:text-white transition">Nous contacter</Link>
              <Link href="/mentions-legales" className="block hover:text-white transition">Mentions légales</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Transport Maroc 2 SARL. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
