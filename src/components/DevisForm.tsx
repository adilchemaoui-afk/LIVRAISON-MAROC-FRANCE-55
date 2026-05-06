'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { resend } from '@/lib/resend';
import { useRouter } from 'next/navigation';
import { Truck, Mail, Phone, User, MapPin, Weight, Ruler, FileText, ChevronRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { ShipmentType } from '@/types';

const SHIPMENT_RATES: Record<ShipmentType, number> = {
  colis: 8,
  lettre: 3,
  'high-tech': 15,
  terroir: 10,
  encombrant: 25,
};

const SHIPMENT_LABELS: Record<ShipmentType, string> = {
  colis: 'Colis standard',
  lettre: 'Lettre / Document',
  'high-tech': 'High-tech / Fragile',
  terroir: 'Produits du terroir',
  encombrant: 'Encombrant / Meuble',
};

export default function DevisForm() {
  const [form, setForm] = useState({
    type: 'colis' as ShipmentType,
    sender_name: '',
    sender_email: '',
    sender_phone: '',
    sender_address: '',
    sender_city: '',
    sender_country: 'France',
    recipient_name: '',
    recipient_email: '',
    recipient_phone: '',
    recipient_address: '',
    recipient_city: '',
    recipient_country: 'Maroc',
    weight: 1,
    dimensions: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const price = form.weight * SHIPMENT_RATES[form.type];

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.from('shipments').insert({
      user_id: null,
      sender_name: form.sender_name,
      sender_email: form.sender_email,
      sender_phone: form.sender_phone,
      sender_address: `${form.sender_address}, ${form.sender_city}`,
      recipient_name: form.recipient_name,
      recipient_email: form.recipient_email,
      recipient_phone: form.recipient_phone,
      recipient_address: `${form.recipient_address}, ${form.recipient_city}`,
      type: form.type,
      weight: form.weight,
      dimensions: form.dimensions,
      description: form.description,
      origin_city: form.sender_city,
      destination_city: form.recipient_city,
      origin_country: form.sender_country,
      destination_country: form.recipient_country,
      status: 'devis',
      price,
      currency: 'EUR',
    });

    if (error) {
      console.error(error);
      alert('Erreur lors de la soumission du devis.');
      setLoading(false);
      return;
    }

    // Email notifications via API route
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: form.sender_email,
          subject: 'Votre demande de devis - Transport Maroc 2',
          html: `<p>Bonjour ${form.sender_name},</p><p>Nous avons bien reçu votre demande de devis. Notre équipe vous contactera sous 24h.</p><p>Montant estimé : ${formatPrice(price)}</p>`,
        }),
      });
    } catch (e) {
      // Silent fail on email
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Devis envoyé avec succès !</h3>
        <p className="text-green-700 mb-4">Nous vous contacterons sous 24 heures.</p>
        <p className="text-lg font-bold text-gray-900">Montant estimé : {formatPrice(price)}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Type d'envoi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Type d&apos;envoi</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(Object.keys(SHIPMENT_RATES) as ShipmentType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleChange('type', t)}
              className={cn(
                'px-4 py-3 rounded-lg border text-sm font-medium transition',
                form.type === t
                  ? 'border-primary bg-blue-50 text-primary'
                  : 'border-gray-300 hover:border-gray-400'
              )}
            >
              {SHIPMENT_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expéditeur */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Expéditeur</span>
          </h3>
          <input required placeholder="Nom complet" className="w-full border rounded-md px-3 py-2" value={form.sender_name} onChange={(e) => handleChange('sender_name', e.target.value)} />
          <input required type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2" value={form.sender_email} onChange={(e) => handleChange('sender_email', e.target.value)} />
          <input required placeholder="Téléphone" className="w-full border rounded-md px-3 py-2" value={form.sender_phone} onChange={(e) => handleChange('sender_phone', e.target.value)} />
          <input required placeholder="Adresse" className="w-full border rounded-md px-3 py-2" value={form.sender_address} onChange={(e) => handleChange('sender_address', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Ville" className="w-full border rounded-md px-3 py-2" value={form.sender_city} onChange={(e) => handleChange('sender_city', e.target.value)} />
            <input placeholder="Pays" className="w-full border rounded-md px-3 py-2" value={form.sender_country} onChange={(e) => handleChange('sender_country', e.target.value)} />
          </div>
        </div>

        {/* Destinataire */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Destinataire</span>
          </h3>
          <input required placeholder="Nom complet" className="w-full border rounded-md px-3 py-2" value={form.recipient_name} onChange={(e) => handleChange('recipient_name', e.target.value)} />
          <input required type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2" value={form.recipient_email} onChange={(e) => handleChange('recipient_email', e.target.value)} />
          <input required placeholder="Téléphone" className="w-full border rounded-md px-3 py-2" value={form.recipient_phone} onChange={(e) => handleChange('recipient_phone', e.target.value)} />
          <input required placeholder="Adresse" className="w-full border rounded-md px-3 py-2" value={form.recipient_address} onChange={(e) => handleChange('recipient_address', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Ville" className="w-full border rounded-md px-3 py-2" value={form.recipient_city} onChange={(e) => handleChange('recipient_city', e.target.value)} />
            <input placeholder="Pays" className="w-full border rounded-md px-3 py-2" value={form.recipient_country} onChange={(e) => handleChange('recipient_country', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Détails colis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
            <Weight className="w-4 h-4" />
            <span>Poids estimé (kg)</span>
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            required
            className="w-full border rounded-md px-3 py-2"
            value={form.weight}
            onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
            <Ruler className="w-4 h-4" />
            <span>Dimensions (Lxlxh cm)</span>
          </label>
          <input
            placeholder="Ex: 30x20x15"
            className="w-full border rounded-md px-3 py-2"
            value={form.dimensions}
            onChange={(e) => handleChange('dimensions', e.target.value)}
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
            <FileText className="w-4 h-4" />
            <span>Description</span>
          </label>
          <input
            placeholder="Contenu du colis"
            className="w-full border rounded-md px-3 py-2"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Prix estimé */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
        <span className="text-blue-900 font-medium">Montant estimé :</span>
        <span className="text-2xl font-bold text-primary">{formatPrice(price)}</span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        <span>{loading ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  );
}
