'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import AdminSidebar from '@/components/AdminSidebar';
import StatusBadge from '@/components/StatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';
import { Truck } from 'lucide-react';
import type { Shipment, ShipmentStatus } from '@/types';

const STATUS_OPTIONS: ShipmentStatus[] = ['devis', 'en_attente', 'approuve', 'paye', 'en_preparation', 'en_transit', 'livre', 'annule'];

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setShipments(data || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: ShipmentStatus) => {
    const supabase = createClient();
    await supabase.from('shipments').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  if (loading) return <div className="flex"><AdminSidebar /><div className="flex-1 p-8">Chargement...</div></div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center space-x-2"><Truck className="w-6 h-6" /><span>Gestion des envois</span></h1>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Expéditeur</th><th className="px-4 py-3 text-left">Destination</th><th className="px-4 py-3 text-left">Prix</th><th className="px-4 py-3 text-left">Statut</th></tr></thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-3">{formatDate(s.created_at)}</td>
                  <td className="px-4 py-3 capitalize">{s.type}</td>
                  <td className="px-4 py-3">{s.sender_name}<br /><span className="text-gray-500">{s.sender_email}</span></td>
                  <td className="px-4 py-3">{s.origin_city} → {s.destination_city}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(s.price, s.currency)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={s.status}
                      onChange={(e) => updateStatus(s.id, e.target.value as ShipmentStatus)}
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
