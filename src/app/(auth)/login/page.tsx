'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="email"
              required
              className="w-full border rounded-md pl-10 pr-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="password"
              required
              className="w-full border rounded-md pl-10 pr-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Pas encore de compte ? <Link href="/register" className="text-primary hover:underline">Inscrivez-vous</Link>
      </p>
    </div>
  );
}
