'use client';

import Link from 'next/link';
import {
  Package,
  Box,
  Mail,
  Gem,
  Laptop,
  Leaf,
  ChevronRight,
  Star,
  MapPin,
  Truck,
  Clock,
  Shield,
  Search,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  MailIcon,
  Weight,
  Building,
  Send,
} from 'lucide-react';
import { useState } from 'react';

/* ================================================================
   IMAGES — utilisation de balises img standard pour éviter
   les problèmes de chargement sur Vercel
   ================================================================ */
const IMG_MOSQUEE = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop&q=80';
const IMG_LIVRAISON = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop&q=80';

/* ================================================================
   CARTE DU MAROC — SVG responsive et stylisé
   ================================================================ */
function MarocMap() {
  const villes = [
    { name: 'Tanger', x: 48, y: 14 },
    { name: 'Tétouan', x: 44, y: 18 },
    { name: 'Rabat', x: 54, y: 28 },
    { name: 'Kenitra', x: 50, y: 24 },
    { name: 'Casablanca', x: 50, y: 34 },
    { name: 'Fès', x: 66, y: 24 },
    { name: 'Oujda', x: 82, y: 22 },
    { name: 'Marrakech', x: 44, y: 46 },
    { name: 'Safi', x: 40, y: 42 },
    { name: 'Essaouira', x: 36, y: 48 },
    { name: 'Agadir', x: 30, y: 58 },
    { name: 'Ouarzazate', x: 52, y: 56 },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <svg viewBox="0 0 100 70" className="w-full h-auto" style={{ maxHeight: '500px' }}>
        {/* Fond océan */}
        <rect width="100" height="70" fill="#E8F0F8" rx="4" />
        
        {/* Silhouette Maroc — contour fluide sans délimitation interne */}
        <path
          d="M 25 10 
             C 32 8, 38 7, 44 8 
             C 50 9, 56 10, 62 11 
             C 68 12, 74 14, 80 16 
             C 85 18, 90 22, 92 26 
             C 94 30, 93 34, 90 38 
             C 87 42, 84 46, 80 50 
             C 76 54, 72 58, 68 62 
             C 64 65, 58 67, 52 68 
             C 46 69, 40 68, 34 66 
             C 28 64, 22 60, 18 55 
             C 14 50, 11 45, 9 40 
             C 7 35, 6 30, 6 25 
             C 6 20, 8 16, 12 14 
             C 16 12, 20 11, 25 10 Z"
          fill="#D4734A"
          stroke="#B85C36"
          strokeWidth="0.8"
        />
        
        {/* Texture subtile — zellige */}
        <pattern id="zellige" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.4" fill="#B85C36" opacity="0.2" />
        </pattern>
        <path
          d="M 25 10 C 32 8, 38 7, 44 8 C 50 9, 56 10, 62 11 C 68 12, 74 14, 80 16 C 85 18, 90 22, 92 26 C 94 30, 93 34, 90 38 C 87 42, 84 46, 80 50 C 76 54, 72 58, 68 62 C 64 65, 58 67, 52 68 C 46 69, 40 68, 34 66 C 28 64, 22 60, 18 55 C 14 50, 11 45, 9 40 C 7 35, 6 30, 6 25 C 6 20, 8 16, 12 14 C 16 12, 20 11, 25 10 Z"
          fill="url(#zellige)"
        />

        {/* Points des villes */}
        {villes.map((ville) => (
          <g key={ville.name}>
            <circle cx={ville.x} cy={ville.y} r="2" fill="#FFFFFF" stroke="#C45C26" strokeWidth="1" />
            <circle cx={ville.x} cy={ville.y} r="0.8" fill="#C45C26" />
            <text
              x={ville.x}
              y={ville.y - 4}
              textAnchor="middle"
              fontSize="3"
              fontWeight="600"
              fill="#1A1A1A"
            >
              {ville.name}
            </text>
          </g>
        ))}

        {/* Labels nord/sud */}
        <text x="50" y="5" textAnchor="middle" fontSize="3" fill="#6B6B6B" fontWeight="500">
          NORD — Méditerranée
        </text>
        <text x="50" y="69" textAnchor="middle" fontSize="3" fill="#6B6B6B" fontWeight="500">
          SUD — Sahara
        </text>
      </svg>
    </div>
  );
}

/* ================================================================
   PAGE PRINCIPALE
   ================================================================ */
export default function HomePage() {
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [debut, setDebut] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [poids, setPoids] = useState('');

  const villesFrance = [
    'Paris','Lyon','Marseille','Toulouse','Nice','Nantes','Strasbourg',
    'Montpellier','Bordeaux','Lille','Rennes','Reims','Le Havre','Saint-Étienne','Toulon',
  ];
  const villesMaroc = [
    'Casablanca','Rabat','Tanger','Marrakech','Fès','Agadir','Oujda',
    'Tétouan','Ouarzazate','Essaouira','Kenitra','Safi',
  ];
  const typesColis = [
    { label: 'Colis Standard', prix: 1 },
    { label: 'Encombrant', prix: 1.3 },
    { label: 'Courrier', prix: 0.8 },
    { label: 'Valeurs', prix: 1.5 },
    { label: 'High-Tech', prix: 1.4 },
    { label: 'Terroir', prix: 1.2 },
  ];
  const [typeColis, setTypeColis] = useState('Colis Standard');

  function calculerPrix() {
    const p = parseFloat(poids);
    if (!p || !debut || !arrivee) return;
    const zoneFactor = villesMaroc.indexOf(arrivee) < 4 ? 8.5 : villesMaroc.indexOf(arrivee) < 7 ? 10 : 12.5;
    const typeFactor = typesColis.find(t => t.label === typeColis)?.prix || 1;
    const prix = Math.round(p * zoneFactor * typeFactor * 100) / 100;
    setCalculatedPrice(prix);
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Texte */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-[#E5DDD4] mb-6">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-[#1A1A1A]">10 000+ colis livrés · 4.8/5</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight tracking-tight mb-6">
                Vos colis au Maroc,<br />
                <span className="text-[#C45C26]">sans friction.</span>
              </h1>
              <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8 max-w-lg">
                De la France vers toutes les villes du Maroc. Tarifs au kilo transparents, 
                suivi GPS temps réel, et un assistant disponible 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center bg-[#C45C26] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#A64A1D] transition-colors shadow-lg shadow-[#C45C26]/25"
                >
                  Calculer mon tarif
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-white text-[#1A1A1A] font-semibold px-8 py-3.5 rounded-full border-2 border-[#E5DDD4] hover:border-[#C45C26] hover:text-[#C45C26] transition-colors"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
            {/* Illustration */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5C4] via-[#F5E6D3] to-[#FFF8F0] rounded-3xl transform rotate-2" />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                  <img
                    src={IMG_MOSQUEE}
                    alt="Mosquée Hassan II à Casablanca"
                    className="object-cover w-full"
                    style={{ maxHeight: '450px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C45C26]/20 to-transparent" />
                </div>
                {/* Badge flottant : Colis livrés */}
                <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-3 border border-[#E5DDD4]">
                  <div className="w-10 h-10 bg-[#C45C26]/10 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#C45C26]" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-sm">10 000+</p>
                    <p className="text-[#6B6B6B] text-xs">Colis livrés</p>
                  </div>
                </div>
                {/* Badge flottant : Note */}
                <div className="absolute -top-3 -right-3 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-2 border border-[#E5DDD4]">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-sm">4.8/5</p>
                    <p className="text-[#6B6B6B] text-xs">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATEUR ────────────────────────────────────────── */}
      <section className="py-20 bg-white" id="calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Votre tarif en 3 clics</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Pas de formulaire interminable. Entrez vos infos, le prix apparaît instantanément.
            </p>
          </div>

          <div className="bg-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E5DDD4]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="flex items-center text-sm font-medium text-[#1A1A1A] mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-[#C45C26]" />
                  Départ (France)
                </label>
                <select
                  value={debut}
                  onChange={(e) => setDebut(e.target.value)}
                  className="w-full bg-white border border-[#E5DDD4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]"
                >
                  <option value="">Choisir une ville</option>
                  {villesFrance.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-[#1A1A1A] mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-[#C45C26]" />
                  Arrivée (Maroc)
                </label>
                <select
                  value={arrivee}
                  onChange={(e) => setArrivee(e.target.value)}
                  className="w-full bg-white border border-[#E5DDD4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]"
                >
                  <option value="">Choisir une ville</option>
                  {villesMaroc.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-[#1A1A1A] mb-2">
                  <Weight className="w-4 h-4 mr-2 text-[#C45C26]" />
                  Poids (kg)
                </label>
                <input
                  type="number"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  placeholder="Ex: 5.5"
                  min="0.1"
                  step="0.1"
                  className="w-full bg-white border border-[#E5DDD4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-[#1A1A1A] mb-2">
                  <Package className="w-4 h-4 mr-2 text-[#C45C26]" />
                  Type de colis
                </label>
                <select
                  value={typeColis}
                  onChange={(e) => setTypeColis(e.target.value)}
                  className="w-full bg-white border border-[#E5DDD4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]"
                >
                  {typesColis.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={calculerPrix}
              className="w-full sm:w-auto bg-[#C45C26] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#A64A1D] transition-colors shadow-lg shadow-[#C45C26]/25 flex items-center justify-center mx-auto"
            >
              Calculer le prix
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            {calculatedPrice !== null && (
              <div className="mt-6 text-center bg-white rounded-xl p-6 border border-[#C45C26]/20">
                <p className="text-sm text-[#6B6B6B] mb-1">Estimation pour {poids} kg</p>
                <p className="text-4xl font-bold text-[#C45C26]">{calculatedPrice.toFixed(2)} €</p>
                <p className="text-xs text-[#6B6B6B] mt-2">Prix indicatif — peut varier selon les dimensions réelles</p>
                <Link href="/devis" className="inline-block mt-4 text-[#C45C26] font-medium hover:underline text-sm">
                  Obtenir un devis précis →
                </Link>
              </div>
            )}
          </div>

          {/* Tableau tarifs */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">Tarifs dégressifs dès 10 kg</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#C45C26]">
                    <th className="text-left py-3 px-4 font-semibold text-[#1A1A1A]">Zone</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1A1A1A]">Villes</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1A1A1A]">Prix/kg</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1A1A1A]">Délai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5DDD4]">
                    <td className="py-3 px-4"><span className="inline-flex items-center justify-center w-6 h-6 bg-[#C45C26]/10 text-[#C45C26] rounded-full text-xs font-bold">1</span></td>
                    <td className="py-3 px-4 text-[#1A1A1A]">Casablanca, Rabat, Tanger, Tétouan, Kenitra</td>
                    <td className="py-3 px-4 font-bold text-[#C45C26]">8.50 €</td>
                    <td className="py-3 px-4 text-[#6B6B6B]">3-7 j</td>
                  </tr>
                  <tr className="border-b border-[#E5DDD4]">
                    <td className="py-3 px-4"><span className="inline-flex items-center justify-center w-6 h-6 bg-[#C45C26]/10 text-[#C45C26] rounded-full text-xs font-bold">2</span></td>
                    <td className="py-3 px-4 text-[#1A1A1A]">Marrakech, Fès, Oujda</td>
                    <td className="py-3 px-4 font-bold text-[#C45C26]">10.00 €</td>
                    <td className="py-3 px-4 text-[#6B6B6B]">5-10 j</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><span className="inline-flex items-center justify-center w-6 h-6 bg-[#C45C26]/10 text-[#C45C26] rounded-full text-xs font-bold">3</span></td>
                    <td className="py-3 px-4 text-[#1A1A1A]">Agadir, Ouarzazate, Essaouira, Safi</td>
                    <td className="py-3 px-4 font-bold text-[#C45C26]">12.50 €</td>
                    <td className="py-3 px-4 text-[#6B6B6B]">7-14 j</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES DE COLIS ───────────────────────────────────── */}
      <section className="py-20 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">On transporte tout</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Des enveloppes aux meubles. Chaque colis mérite le même soin.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Box, title: 'Colis Standard', desc: 'Vêtements, chaussures, objets, documents', tags: ['0.5 – 30 kg'] },
              { icon: Package, title: 'Encombrant', desc: 'Meubles, électroménager, matelas', tags: ['30 – 200+ kg', 'Sur-mesure'] },
              { icon: Mail, title: 'Courrier', desc: 'Papiers administratifs, plis', tags: ['Jusqu\'à 500 g', 'Recommandé'] },
              { icon: Gem, title: 'Valeurs', desc: 'Clés, bijoux, objets précieux', tags: ['Jusqu\'à 2 kg', 'Assurance'] },
              { icon: Laptop, title: 'High-Tech', desc: 'Smartphones, laptops, accessoires', tags: ['Jusqu\'à 5 kg', 'Anti-choc'] },
              { icon: Leaf, title: 'Terroir', desc: 'Huile d\'argan, épices, produits secs', tags: ['Jusqu\'à 10 kg', 'Douane'] },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD4] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#C45C26]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#C45C26]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#F5F0EB] text-[#6B6B6B] px-2.5 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARTE MAROC ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Nous couvrons tout le Maroc</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              De Tanger à Agadir, de Fès à Marrakech — nous livrons partout.
            </p>
          </div>
          <MarocMap />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Casablanca','Rabat','Tanger','Marrakech','Fès','Agadir','Oujda','Tétouan','Ouarzazate','Essaouira'].map(ville => (
              <span key={ville} className="inline-flex items-center bg-[#F5F0EB] text-[#1A1A1A] px-3 py-1.5 rounded-full text-sm font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C45C26] mr-1.5" />
                {ville}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────────────────── */}
      <section className="py-20 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Comment ça marche ?</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Un processus pensé pour vous faire gagner du temps.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', icon: User, title: 'Créez votre compte', desc: '2 minutes. Une seule adresse à mémoriser.' },
              { step: '2', icon: CheckCircle2, title: 'Calculez & payez', desc: 'Prix au kilo affiché instantanément. CB ou PayPal.' },
              { step: '3', icon: Truck, title: 'On vient chercher', desc: 'Enlèvement à domicile ou dépôt proche de chez vous.' },
              { step: '4', icon: Clock, title: 'Vous suivez tout', desc: 'Notifications en temps réel jusqu\'à la livraison.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-[#C45C26] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-[#C45C26]/25">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <item.icon className="w-6 h-6 text-[#C45C26]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Ils nous font confiance</h2>
            <p className="text-[#6B6B6B] text-lg">127 avis vérifiés · Note moyenne 4.8/5</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Karim B.', route: 'Paris → Casablanca', stars: 5, text: '"Colis de 15kg arrivé en 5 jours, parfait ! Service très professionnel."' },
              { name: 'Sofia M.', route: 'Lyon → Rabat', stars: 5, text: '"J\'envoie régulièrement des colis à ma famille. Tarifs clairs et livraison rapide."' },
              { name: 'Youssef A.', route: 'Marseille → Marrakech', stars: 4, text: '"Premier envoi et très satisfait. Le suivi en temps réel rassure beaucoup."' },
            ].map((avis) => (
              <div key={avis.name} className="bg-[#F5F0EB] rounded-2xl p-6 border border-[#E5DDD4]">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#C45C26]/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#C45C26] font-bold text-sm">{avis.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">{avis.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{avis.route}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= avis.stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-[#1A1A1A] italic">{avis.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUIVI ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Où est mon colis ?</h2>
              <p className="text-[#6B6B6B] text-lg mb-8">Tapez votre numéro. On vous dit tout.</p>
              <div className="flex gap-3 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                  <input
                    type="text"
                    placeholder="N° de suivi (TM-2025-XXXXX)"
                    className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]"
                  />
                </div>
                <button className="bg-[#C45C26] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#A64A1D] transition-colors">
                  Localiser
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Clock, title: 'Suivi temps réel', desc: 'Chaque étape notifiée' },
                  { icon: Shield, title: 'Délai garanti', desc: 'Remboursement si retard' },
                  { icon: MapPin, title: 'Porte-à-porte', desc: 'Jusqu\'au domicile' },
                ].map(f => (
                  <div key={f.title} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <f.icon className="w-5 h-5 text-[#C45C26]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">{f.title}</p>
                      <p className="text-xs text-[#6B6B6B]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={IMG_LIVRAISON}
                alt="Colis en cours de livraison au Maroc"
                className="rounded-2xl shadow-xl object-cover w-full"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DEVIS PERSONNALISÉ ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center bg-[#C45C26]/10 text-[#C45C26] rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Réponse sous 2 heures
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">Besoin d'un devis personnalisé ?</h2>
              <p className="text-[#6B6B6B] text-lg mb-8">
                Remplissez ce formulaire. Notre équipe vous rappelle sous 2 heures avec un tarif sur mesure.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, text: 'Devis 100% gratuit et sans engagement' },
                  { icon: CheckCircle2, text: 'Conseiller dédié pour les envois réguliers' },
                  { icon: CheckCircle2, text: 'Premier envoi : -15% avec le code BIENVENUE' },
                ].map(item => (
                  <div key={item.text} className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-[#C45C26]" />
                    <span className="text-sm text-[#1A1A1A]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <form className="bg-[#F5F0EB] rounded-2xl p-6 sm:p-8 border border-[#E5DDD4]">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="text" placeholder="Votre nom" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="email" placeholder="Email" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="tel" placeholder="Téléphone" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="number" placeholder="Poids estimé (kg)" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="text" placeholder="Ville de départ" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input type="text" placeholder="Ville d\'arrivée" className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26]" />
                </div>
              </div>
              <div className="relative mb-4">
                <Send className="absolute left-3 top-3 w-4 h-4 text-[#6B6B6B]" />
                <textarea placeholder="Décrivez votre envoi (optionnel)" rows={3} className="w-full bg-white border border-[#E5DDD4] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] resize-none" />
              </div>
              <button type="button" className="w-full bg-[#C45C26] text-white font-semibold py-3.5 rounded-xl hover:bg-[#A64A1D] transition-colors shadow-lg shadow-[#C45C26]/25 flex items-center justify-center">
                Recevoir mon devis
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-[#6B6B6B] mt-4 text-center flex items-center justify-center">
                <Shield className="w-3 h-3 mr-1" />
                Vos données restent confidentielles. Pas de spam.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
