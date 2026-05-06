import Hero from '@/components/Hero';
import { Truck, Mail, Cpu, Apple, Sofa, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  { icon: Truck, title: 'Colis standard', desc: 'Vos colis du quotidien, sécurisés et assurés.' },
  { icon: Mail, title: 'Lettres \u0026 Documents', desc: 'Courrier administratif et documents importants.' },
  { icon: Cpu, title: 'High-tech', desc: 'Électronique, smartphones, ordinateurs avec protection renforcée.' },
  { icon: Apple, title: 'Produits du terroir', desc: 'Huile d\u0027olive, épices, miel et délices marocains.' },
  { icon: Sofa, title: 'Encombrants', desc: 'Meubles et objets volumineux, transport sur mesure.' },
];

const steps = [
  { num: '1', title: 'Demandez un devis', desc: 'Remplissez le formulaire en 2 minutes. Prix affiché en direct.' },
  { num: '2', title: 'Validation', desc: 'Notre équipe valide votre devis sous 24h par email.' },
  { num: '3', title: 'Paiement sécurisé', desc: 'Réglez en ligne par carte bancaire via Stripe.' },
  { num: '4', title: 'Livraison', desc: 'Suivi en temps réel jusqu\u0027à la livraison chez le destinataire.' },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nos services de transport</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border rounded-lg p-6 hover:shadow-md transition bg-gray-50">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {num}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bandeau */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à expédier ?</h2>
          <p className="text-blue-100 mb-8">Obtenez votre devis gratuit en quelques clics. Sans engagement.</p>
          <Link
            href="/devis"
            className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-600" /><span>Assurance incluse</span></div>
          <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-600" /><span>Suivi en temps réel</span></div>
          <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-600" /><span>Paiement sécurisé Stripe</span></div>
          <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-600" /><span>Service client 7j/7</span></div>
        </div>
      </section>
    </>
  );
}
