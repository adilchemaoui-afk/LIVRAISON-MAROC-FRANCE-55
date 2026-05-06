'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'adc.lecolibri@gmail.com',
        subject: `Message de ${form.name}`,
        html: `<p><strong>Email:</strong> ${form.email}</p><p>${form.message}</p>`,
      }),
    });
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Contactez-nous</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>adc.lecolibri@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>07 53 25 68 97</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>7 Rue de la Noue, 93170 Bagnolet, France</span>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-lg overflow-hidden border h-64">
            <iframe
              title="Localisation"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.4167!3d48.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzAwLjAiTiAywrAyNScwMC4wIkU!5e0!3m2!1sfr!2sfr!4v1`}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border rounded-lg p-6">
          {sent ? (
            <div className="text-center py-8">
              <Send className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800">Message envoyé !</h3>
              <p className="text-green-700 mt-2">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input required className="w-full border rounded-md px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full border rounded-md px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows={5} className="w-full border rounded-md px-3 py-2" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Envoyer</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
