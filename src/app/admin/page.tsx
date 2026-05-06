'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import AdminSidebar from '@/components/AdminSidebar';
import { formatPrice } from '@/lib/utils';
import { ClipboardList, Truck, CreditCard, Users, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    devis: 0,
    shipments: 0,
    revenue: 0,
    clients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('shipments').select('id', { count: 'exact', head: true }).eq('status', 'devis'),
      supabase.from('shipments').select('id', { count: 'exact', head: true }).in('status', ['paye', 'en_preparation', 'en_transit']),
      supabase.from('payments').select('amount').eq('status', 'completed'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
    ]).then(([devisRes, shipRes, paymentsRes, clientsRes]) => {
      const revenue = (paymentsRes.data || []).reduce((sum, p) => sum + (p.amount || 0), 0);
      setStats({
        devis: devisRes.count || 0,
        shipments: shipRes.count || 0,
        revenue,
        clients: clientsRes.count || 0,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Devis en attente', value: stats.devis, icon: ClipboardList, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Envois en cours', value: stats.shipments, icon: Truck, color: 'bg-blue-100 text-blue-800' },
    { label: 'Chiffre d\'affaires', value: formatPrice(stats.revenue), icon: CreditCard, color: 'bg-green-100 text-green-800' },
    { label: 'Clients', value: stats.clients, icon: Users, color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6" />
          <span>Tableau de bord</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border rounded-lg p-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
