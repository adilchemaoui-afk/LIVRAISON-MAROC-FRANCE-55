import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558865869-c93f6f8482af?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Votre pont logistique entre le Maroc et la France
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
          Transport de colis, lettres, high-tech et produits du terroir
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/devis"
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center space-x-2"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Nous contacter</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
