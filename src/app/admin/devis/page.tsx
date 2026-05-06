'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import AdminSidebar from '@/components/AdminSidebar';
import StatusBadge from '@/components/StatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';
import { CheckCircle, XCircle, Pencil } from 'lucide-react';
import type { Shipment } from '@/types';

export default function AdminDevisPage() {
  const [devis, setDevis] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('shipments')
      .select('*')
      .eq('status', 'devis')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setDevis(data || []);
        setLoading(false);
      });
  }, []);

  const handleApprove = async (id: string, newPrice?: number) => {
    const supabase = createClient();
    const updates: Partial<Shipment> = { status: 'approuve', updated_at: new Date().toISOString() };
    if (newPrice) updates.price = newPrice;
    await supabase.from('shipments').update(updates).eq('id', id);
    setDevis((prev) => prev.filter((d) => d.id !== id));
  };

  const handleReject = async (id: string) => {
    const supabase = createClient();
    await supabase.from('shipments').update({ status: 'annule' }).eq('id', id);
    setDevis((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading) return <div className="flex"><AdminSidebar /><div className="flex-1 p-8">Chargement...</div></div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Gestion des devis</h1>
        {devis.length === 0 ? (
          <p className="text-gray-500">Aucun devis en attente.</p>
        ) : (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Expéditeur</th>
                  <th className="px-4 py-3 text-left">Destination</th>
                  <th className="px-4 py-3 text-left">Prix estimé</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devis.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-3">{formatDate(d.created_at)}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">{d.sender_name}<br /><span className="text-gray-500">{d.sender_email}</span></td>
                    <td className="px-4 py-3">{d.origin_city} → {d.destination_city}</td>
                    <td className="px-4 py-3 font-medium">{formatPrice(d.price, d.currency)}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button onClick={() => handleApprove(d.id)} className="text-green-600 hover:text-green-800" title="Approuver"><CheckCircle className="w-5 h-5" /></button>
                        <button onClick={() => {
                          const np = prompt('Nouveau prix (EUR):', String(d.price));
                          if (np) handleApprove(d.id, parseFloat(np));
                        }} className="text-blue-600 hover:text-blue-800" title="Modifier prix"><Pencil className="w-5 h-5" /></button>
                        <button onClick={() => handleReject(d.id)} className="text-red-600 hover:text-red-800" title="Refuser"><XCircle className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
