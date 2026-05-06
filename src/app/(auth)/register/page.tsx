'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, MapPin, Building } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    company_name: '',
    siret: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name },
      },
    });

    if (authError || !data.user) {
      setError(authError?.message || 'Erreur lors de l\u0027inscription.');
      setLoading(false);
      return;
    }

    // Insert profile (trigger will make first user admin)
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: form.full_name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      user_type: 'client',
      company_name: form.company_name || null,
      siret: form.siret || null,
      language: 'fr',
      notifications_enabled: true,
    });

    if (profileError) {
      console.error(profileError);
    }

    setLoading(false);
    router.push('/login?registered=1');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required placeholder="Nom complet" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.full_name} onChange={(e) => handleChange('full_name', e.target.value)} />
          </div>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required type="email" placeholder="Email" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required type="password" minLength={6} placeholder="Mot de passe (6+ car.)" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.password} onChange={(e) => handleChange('password', e.target.value)} />
          </div>
          <div className="relative">
            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required placeholder="Téléphone" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          </div>
          <div className="relative">
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required placeholder="Adresse" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
          </div>
          <div className="relative">
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input required placeholder="Ville" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
          </div>
          <div className="relative">
            <Building className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input placeholder="Société (opt.)" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.company_name} onChange={(e) => handleChange('company_name', e.target.value)} />
          </div>
          <div className="relative">
            <Building className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input placeholder="SIRET (opt.)" className="w-full border rounded-md pl-10 pr-3 py-2" value={form.siret} onChange={(e) => handleChange('siret', e.target.value)} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? 'Inscription...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Déjà un compte ? <Link href="/login" className="text-primary hover:underline">Connectez-vous</Link>
      </p>
    </div>
  );
}
