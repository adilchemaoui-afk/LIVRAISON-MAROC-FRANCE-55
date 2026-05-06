'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import AdminSidebar from '@/components/AdminSidebar';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import type { Profile } from '@/types';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setClients(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex"><AdminSidebar /><div className="flex-1 p-8">Chargement...</div></div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center space-x-2"><User className="w-6 h-6" /><span>Liste des clients</span></h1>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left">Nom</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Téléphone</th><th className="px-4 py-3 text-left">Ville</th><th className="px-4 py-3 text-left">Type</th></tr></thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{c.full_name}</td>
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.city}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${c.user_type === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{c.user_type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
