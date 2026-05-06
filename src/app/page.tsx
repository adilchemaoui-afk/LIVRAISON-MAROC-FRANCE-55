'use client';

import Link from 'next/link';
import {
  Package, Box, Mail, Gem, Laptop, Leaf,
  ChevronRight, Star, MapPin, Truck, Clock,
  Shield, Search, CheckCircle2, ArrowRight,
  User, Phone, MailIcon, Weight, Building, Send,
  Calendar, Euro, Route, ArrowUpRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

/* ================================================================
   MAROC MAP — SVG responsive
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
      <div className="bg-white rounded-2xl shadow-xl border border-[#E5DDD4] p-4 sm:p-6">
        <svg viewBox="0 0 100 70" className="w-full h-auto" style={{ maxHeight: '500px' }}>
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8F0F8" />
              <stop offset="100%" stopColor="#D4E4F2" />
            </linearGradient>
            <linearGradient id="marocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4734A" />
              <stop offset="100%" stopColor="#C45C26" />
            </linearGradient>
          </defs>
          <rect width="100" height="70" fill="url(#oceanGrad)" rx="4" />
          
          <path
            d="M 25 10 C 32 8, 38 7, 44 8 C 50 9, 56 10, 62 11 C 68 12, 74 14, 80 16 C 85 18, 90 22, 92 26 C 94 30, 93 34, 90 38 C 87 42, 84 46, 80 50 C 76 54, 72 58, 68 62 C 64 65, 58 67, 52 68 C 46 69, 40 68, 34 66 C 28 64, 22 60, 18 55 C 14 50, 11 45, 9 40 C 7 35, 6 30, 6 25 C 6 20, 8 16, 12 14 C 16 12, 20 11, 25 10 Z"
            fill="url(#marocGrad)"
            stroke="#A64A1D"
            strokeWidth="0.8"
          />
          
          <pattern id="zellige" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.4" fill="#FFF" opacity="0.15" />
          </pattern>
          <path
            d="M 25 10 C 32 8, 38 7, 44 8 C 50 9, 56 10, 62 11 C 68 12, 74 14, 80 16 C 85 18, 90 22, 92 26 C 94 30, 93 34, 90 38 C 87 42, 84 46, 80 50 C 76 54, 72 58, 68 62 C 64 65, 58 67, 52 68 C 46 69, 40 68, 34 66 C 28 64, 22 60, 18 55 C 14 50, 11 45, 9 40 C 7 35, 6 30, 6 25 C 6 20, 8 16, 12 14 C 16 12, 20 11, 25 10 Z"
            fill="url(#zellige)"
          />

          {villes.map((ville) => (
            <g key={ville.name}>
              <circle cx={ville.x} cy={ville.y} r="3" fill="#FFFFFF" stroke="#C45C26" strokeWidth="1.5" />
              <circle cx={ville.x} cy={ville.y} r="1.2" fill="#C45C26" />
              <text
                x={ville.x}
                y={ville.y - 5}
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="600"
                fill="#1A1A1A"
              >{ville.name}</text>
            </g>
          ))}

          <text x="50" y="5" textAnchor="middle" fontSize="3.2" fill="#6B6B6B" fontWeight="500">NORD — Méditerranée</text>
          <text x="50" y="69" textAnchor="middle" fontSize="3.2" fill="#6B6B6B" fontWeight="500">SUD — Sahara</text>
        </svg>
      </div>
    </div>
  );
}

/* ================================================================
   STATS COUNTER
   ================================================================ */
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <span>{count.toLocaleString('fr-FR')}{suffix}</span>;
}

/* ================================================================
   MAIN PAGE
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
    <div className="min-h-screen">

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80"
            alt="Maroc"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#C45C26]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20 mb-8">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-white">10 000+ colis livrés · 4.8/5 ⭐</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Vos colis au Maroc,<br />
                <span className="text-[#E87E3A]">sans friction.</span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
                De la France vers toutes les villes du Maroc. Tarifs au kilo transparents, 
                suivi GPS temps réel, livraison 3 à 14 jours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/devis"
                  className="btn-glow inline-flex items-center justify-center bg-[#C45C26] text-white font-bold px-8 py-4 rounded-full text-lg"
                >
                  Calculer mon tarif
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all text-lg"
                >
                  Créer un compte
                </Link>
              </div>
            </div>

            {/* Right side - floating cards */}
            <div className="hidden lg:block relative">
              <div className="animate-float absolute top-0 right-0 bg-white rounded-2xl p-5 shadow-2xl border border-[#E5DDD4] max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C45C26]/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#C45C26]" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-lg"><AnimatedCounter end={10000} suffix="+" /></p>
                    <p className="text-[#6B6B6B] text-sm">Colis livrés</p>
                  </div>
                </div>
              </div>

              <div className="animate-float-delayed absolute top-32 right-12 bg-white rounded-2xl p-5 shadow-2xl border border-[#E5DDD4] max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-lg">4.8/5</p>
                    <p className="text-[#6B6B6B] text-sm">Note moyenne</p>
                  </div>
                </div>
              </div>

              <div className="animate-float absolute bottom-0 right-24 bg-white rounded-2xl p-5 shadow-2xl border border-[#E5DDD4] max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-lg">12</p>
                    <p className="text-[#6B6B6B] text-sm">Villes couvertes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ STATS BAR ============ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Package, value: '10,000+', label: 'Colis livrés', color: 'text-[#C45C26]' },
              { icon: MapPin, value: '12', label: 'Villes desservies', color: 'text-green-600' },
              { icon: Clock, value: '3-14', label: 'Jours de livraison', color: 'text-blue-600' },
              { icon: Euro, value: '8.50€', label: 'À partir du kg', color: 'text-[#C45C26]' },
            ].map((stat) => (
              <div key={stat.label} className="animate-fade-in-up">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{stat.value}</p>
                <p className="text-sm text-[#6B6B6B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ CALCULATOR ============ */}
      <section className="py-24 bg-[#F5F0EB]" id="calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">Votre tarif en 3 clics</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Pas de formulaire interminable. Entrez vos infos, le prix apparaît instantanément.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E5DDD4] animate-fade-in-up animate-delay-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Départ (France)', icon: MapPin, value: debut, onChange: setDebut, options: villesFrance },
                { label: 'Arrivée (Maroc)', icon: MapPin, value: arrivee, onChange: setArrivee, options: villesMaroc },
                { label: 'Poids (kg)', icon: Weight, type: 'number', value: poids, onChange: setPoids },
                { label: 'Type de colis', icon: Package, value: typeColis, onChange: setTypeColis, options: typesColis.map(t => t.label) },
              ].map((field) => (
                <div key={field.label}>
                  <label className="flex items-center text-sm font-semibold text-[#1A1A1A] mb-2.5">
                    <field.icon className="w-4 h-4 mr-2 text-[#C45C26]" />
                    {field.label}
                  </label>
                  {field.type === 'number' ? (
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="Ex: 5.5"
                      min="0.1"
                      step="0.1"
                      className="w-full bg-[#F5F0EB] border border-[#E5DDD4] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] transition-all"
                    />
                  ) : field.options ? (
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full bg-[#F5F0EB] border border-[#E5DDD4] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] transition-all appearance-none"
                    >
                      {!field.value && <option value="">Choisir...</option>}
                      {field.options.map((v: string) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  ) : null}
                </div>
              ))}
            </div>

            <button
              onClick={calculerPrix}
              className="btn-glow w-full sm:w-auto bg-[#C45C26] text-white font-bold px-10 py-4 rounded-full text-lg flex items-center justify-center mx-auto"
            >
              Calculer le prix
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            {calculatedPrice !== null && (
              <div className="mt-8 text-center bg-gradient-to-br from-[#C45C26]/10 to-[#E87E3A]/10 rounded-2xl p-8 border-2 border-[#C45C26]/20 animate-fade-in-up">
                <p className="text-sm text-[#6B6B6B] mb-2">Estimation pour <span className="font-semibold text-[#1A1A1A]">{poids} kg</span></p>
                <p className="text-5xl font-bold text-[#C45C26] mb-2">{calculatedPrice.toFixed(2)} €</p>
                <p className="text-xs text-[#6B6B6B] mb-4">Prix indicatif — peut varier selon les dimensions réelles</p>
                <Link href="/devis" className="inline-flex items-center text-[#C45C26] font-semibold hover:underline">
                  Obtenir un devis précis
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}
          </div>

          {/* Pricing table */}
          <div className="mt-16 animate-fade-in-up animate-delay-2">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">Tarifs par zone — dégressifs dès 10 kg</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-2xl shadow-lg border border-[#E5DDD4] overflow-hidden">
                <thead>
                  <tr className="bg-[#1A1A1A]">
                    <th className="text-left py-4 px-6 font-semibold text-white">Zone</th>
                    <th className="text-left py-4 px-6 font-semibold text-white">Villes desservies</th>
                    <th className="text-left py-4 px-6 font-semibold text-white">Prix/kg</th>
                    <th className="text-left py-4 px-6 font-semibold text-white">Délai estimé</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { zone: '1', villes: 'Casablanca, Rabat, Tanger, Tétouan, Kenitra', prix: '8.50 €', delai: '3-7 jours' },
                    { zone: '2', villes: 'Marrakech, Fès, Oujda', prix: '10.00 €', delai: '5-10 jours' },
                    { zone: '3', villes: 'Agadir, Ouarzazate, Essaouira, Safi', prix: '12.50 €', delai: '7-14 jours' },
                  ].map((row, i) => (
                    <tr key={row.zone} className={`border-b border-[#E5DDD4] ${i % 2 === 1 ? 'bg-[#F5F0EB]' : ''}`}>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#C45C26] text-white rounded-full text-sm font-bold">{row.zone}</span>
                      </td>
                      <td className="py-4 px-6 text-[#1A1A1A] font-medium">{row.villes}</td>
                      <td className="py-4 px-6 font-bold text-[#C45C26] text-lg">{row.prix}</td>
                      <td className="py-4 px-6 text-[#6B6B6B]">{row.delai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ PACKAGE TYPES ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">On transporte tout</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Des enveloppes aux meubles. Chaque colis mérite le même soin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Box, title: 'Colis Standard', desc: 'Vêtements, chaussures, objets divers, documents administratifs', tags: ['0.5 – 30 kg', 'Standard'], color: 'bg-[#C45C26]' },
              { icon: Package, title: 'Encombrant', desc: 'Meubles, électroménager, matelas, gros appareils', tags: ['30 – 200+ kg', 'Sur-mesure'], color: 'bg-blue-600' },
              { icon: Mail, title: 'Courrier', desc: 'Papiers administratifs, plis urgents, documents sensibles', tags: ['Jusqu\'à 500 g', 'Recommandé'], color: 'bg-green-600' },
              { icon: Gem, title: 'Valeurs', desc: 'Clés, bijoux, objets précieux, documents confidentiels', tags: ['Jusqu\'à 2 kg', 'Assurance incluse'], color: 'bg-purple-600' },
              { icon: Laptop, title: 'High-Tech', desc: 'Smartphones, laptops, tablettes, accessoires électroniques', tags: ['Jusqu\'à 5 kg', 'Emballage anti-choc'], color: 'bg-indigo-600' },
              { icon: Leaf, title: 'Terroir', desc: 'Huile d\'argan, épices, produits secs du terroir marocain', tags: ['Jusqu\'à 10 kg', 'Conforme douane'], color: 'bg-emerald-600' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`card-lift bg-[#F5F0EB] rounded-2xl p-7 border border-[#E5DDD4] animate-fade-in-up animate-delay-${i + 1}`}
              >
                <div className="flex items-center mb-5">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-lg mr-4`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{item.title}</h3>
                </div>
                <p className="text-[#6B6B6B] mb-5 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white text-[#6B6B6B] px-3 py-1.5 rounded-full font-semibold border border-[#E5DDD4]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ MOROCCO MAP ============ */}
      <section className="py-24 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">Nous couvrons tout le Maroc</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              De Tanger à Agadir, de Fès à Marrakech — la livraison porte-à-porte dans toutes les villes.
            </p>
          </div>

          <MarocMap />

          <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-in-up animate-delay-2">
            {['Casablanca','Rabat','Tanger','Marrakech','Fès','Agadir','Oujda','Tétouan','Ouarzazate','Essaouira','Kenitra','Safi'].map(ville => (
              <span key={ville} className="inline-flex items-center bg-white text-[#1A1A1A] px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-[#E5DDD4]">
                <MapPin className="w-4 h-4 text-[#C45C26] mr-2" />
                {ville}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">Comment ça marche ?</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Un processus pensé pour vous faire gagner du temps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', icon: User, title: 'Créez votre compte', desc: '2 minutes. Une seule adresse à mémoriser. Connexion sécurisée garantie.', color: 'from-[#C45C26] to-[#E87E3A]' },
              { step: '2', icon: CheckCircle2, title: 'Calculez \u0026 payez', desc: 'Prix au kilo affiché instantanément. Paiement CB ou PayPal sécurisé.', color: 'from-blue-500 to-blue-600' },
              { step: '3', icon: Truck, title: 'On vient chercher', desc: 'Enlèvement à domicile en France ou dépôt dans un point relais.', color: 'from-green-500 to-green-600' },
              { step: '4', icon: Route, title: 'Vous suivez tout', desc: 'Notifications en temps réel à chaque étape jusqu\'à la livraison.', color: 'from-purple-500 to-purple-600' },
            ].map((item, i) => (
              <div key={item.step} className={`text-center animate-fade-in-up animate-delay-${i + 1}`}>
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl`}>
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-[#F5F0EB] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <item.icon className="w-8 h-8 text-[#C45C26]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Arrow connectors on desktop */}
          <div className="hidden lg:flex justify-center mt-12">
            <Link href="/register" className="btn-glow inline-flex items-center bg-[#C45C26] text-white font-bold px-10 py-4 rounded-full text-lg">
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">Ils nous font confiance</h2>
            <p className="text-[#6B6B6B] text-lg">127 avis vérifiés · Note moyenne 4.8/5 ⭐</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Karim B.', route: 'Paris → Casablanca', stars: 5, text: '"Colis de 15kg arrivé en 5 jours, parfait ! Service très professionnel et suivi impeccable. Je recommande vivement."' },
              { name: 'Sofia M.', route: 'Lyon → Rabat', stars: 5, text: '"J\'envoie régulièrement des colis à ma famille. Tarifs clairs, livraison rapide et équipe toujours disponible."' },
              { name: 'Youssef A.', route: 'Marseille → Marrakech', stars: 4, text: '"Premier envoi et très satisfait. Le suivi en temps réel rassure beaucoup. Prix compétitifs aussi."' },
            ].map((avis, i) => (
              <div key={avis.name} className={`bg-white rounded-2xl p-8 border border-[#E5DDD4] shadow-lg card-lift animate-fade-in-up animate-delay-${i + 1}`}>
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C45C26] to-[#E87E3A] rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-white font-bold text-lg">{avis.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">{avis.name}</p>
                    <p className="text-sm text-[#6B6B6B] flex items-center">
                      <Route className="w-3 h-3 mr-1" />
                      {avis.route}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-5 h-5 ${i <= avis.stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-[#1A1A1A] italic leading-relaxed">{avis.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ TRACKING ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">Où est mon colis ?</h2>
              <p className="text-[#6B6B6B] text-lg mb-10">Tapez votre numéro. On vous dit tout, en temps réel.</p>

              <div className="flex gap-3 mb-10">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                  <input
                    type="text"
                    placeholder="N° de suivi (TM-2025-XXXXX)"
                    className="w-full bg-[#F5F0EB] border-2 border-[#E5DDD4] rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] transition-all"
                  />
                </div>
                <button className="btn-glow bg-[#C45C26] text-white font-bold px-8 py-4 rounded-xl">
                  Localiser
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Clock, title: 'Suivi temps réel', desc: 'Chaque étape notifiée par email et SMS' },
                  { icon: Shield, title: 'Délai garanti', desc: 'Remboursement si retard de plus de 48h' },
                  { icon: MapPin, title: 'Porte-à-porte', desc: 'Jusqu\'au domicile du destinataire' },
                ].map(f => (
                  <div key={f.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F5F0EB] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <f.icon className="w-6 h-6 text-[#C45C26]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A] mb-1">{f.title}</p>
                      <p className="text-sm text-[#6B6B6B]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-slide-in-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
                  alt="Livraison au Maroc"
                  className="rounded-3xl shadow-2xl object-cover w-full"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-[#E5DDD4] animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A] text-sm">Livré !</p>
                      <p className="text-xs text-[#6B6B6B]">Casablanca · Il y a 2h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ QUOTE FORM ============ */}
      <section className="py-24 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center bg-[#C45C26]/10 text-[#C45C26] rounded-full px-5 py-2.5 text-sm font-bold mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Réponse sous 2 heures
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5">Besoin d'un devis personnalisé ?</h2>

              <p className="text-[#6B6B6B] text-lg mb-10">
                Remplissez ce formulaire. Notre équipe vous rappelle sous 2 heures avec un tarif sur mesure.
              </p>

              <div className="space-y-5">
                {[
                  { icon: CheckCircle2, text: 'Devis 100% gratuit et sans engagement' },
                  { icon: CheckCircle2, text: 'Conseiller dédié pour les envois réguliers' },
                  { icon: CheckCircle2, text: 'Premier envoi : -15% avec le code BIENVENUE' },
                  { icon: CheckCircle2, text: 'Assurance tous risques disponible' },
                ].map(item => (
                  <div key={item.text} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#C45C26]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-[#C45C26]" />
                    </div>
                    <span className="text-[#1A1A1A] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <form className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DDD4] shadow-xl animate-fade-in-up animate-delay-2">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { icon: User, placeholder: 'Votre nom', type: 'text' },
                  { icon: MailIcon, placeholder: 'Email', type: 'email' },
                  { icon: Phone, placeholder: 'Téléphone', type: 'tel' },
                  { icon: Weight, placeholder: 'Poids estimé (kg)', type: 'number' },
                  { icon: Building, placeholder: 'Ville de départ', type: 'text' },
                  { icon: MapPin, placeholder: "Ville d\'arrivée", type: 'text' },
                ].map((field) => (
                  <div key={field.placeholder} className="relative">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-[#F5F0EB] border border-[#E5DDD4] rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="relative mb-6">
                <Send className="absolute left-4 top-4 w-4 h-4 text-[#6B6B6B]" />
                <textarea
                  placeholder="Décrivez votre envoi (dimensions, contenu, urgences...)"
                  rows={4}
                  className="w-full bg-[#F5F0EB] border border-[#E5DDD4] rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C45C26]/30 focus:border-[#C45C26] transition-all resize-none"
                />
              </div>

              <button
                type="button"
                className="btn-glow w-full bg-[#C45C26] text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center"
              >
                Recevoir mon devis
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <p className="text-xs text-[#6B6B6B] mt-5 text-center flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Vos données restent confidentielles. Pas de spam, jamais.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-20 bg-gradient-to-r from-[#C45C26] to-[#E87E3A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Prêt à expédier votre premier colis ?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Rejoignez les 10 000+ clients satisfaits. Livraison France → Maroc en 3 à 14 jours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center bg-white text-[#C45C26] font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Calculer mon tarif
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white/20 text-white font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/40 hover:bg-white/30 transition-all"
            >
              Créer un compte gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
