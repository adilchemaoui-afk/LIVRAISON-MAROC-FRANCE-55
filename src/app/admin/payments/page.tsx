'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import AdminSidebar from '@/components/AdminSidebar';
import { formatPrice, formatDate } from '@/lib/utils';
import { CreditCard } from 'lucide-react';
import type { Payment } from '@/types';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPayments(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex"><AdminSidebar /><div className="flex-1 p-8">Chargement...</div></div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center space-x-2"><CreditCard className="w-6 h-6" /><span>Gestion des paiements</span></h1>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Montant</th><th className="px-4 py-3 text-left">Statut</th><th className="px-4 py-3 text-left">Stripe ID</th></tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{formatDate(p.created_at)}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(p.amount, p.currency)}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${p.status === 'completed' ? 'bg-green-100 text-green-800' : p.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{p.status}</span></td>
                  <td className="px-4 py-3 text-gray-500">{p.stripe_session_id || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
