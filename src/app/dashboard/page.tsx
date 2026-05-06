'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useAuth } from '@/hooks/useAuth';
import ShipmentCard from '@/components/ShipmentCard';
import TrackingTimeline from '@/components/TrackingTimeline';
import StatusBadge from '@/components/StatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, MapPin, Weight } from 'lucide-react';
import type { Shipment, TrackingUpdate } from '@/types';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [tracking, setTracking] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from('shipments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setShipments(data || []);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!selectedShipment) {
      setTracking([]);
      return;
    }
    const supabase = createClient();
    supabase
      .from('tracking_updates')
      .select('*')
      .eq('shipment_id', selectedShipment.id)
      .order('updated_at', { ascending: true })
      .then(({ data }) => setTracking(data || []));
  }, [selectedShipment]);

  if (authLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Mon espace</h1>

      {shipments.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-lg">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Vous n\u0027avez pas encore d\u0027envoi.</p>
          <a href="/devis" className="text-primary hover:underline mt-2 inline-block">Demander un devis</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg mb-4">Mes envois</h2>
            {shipments.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedShipment(s)}
                className={`cursor-pointer transition ${selectedShipment?.id === s.id ? 'ring-2 ring-primary' : ''}`}
              >
                <ShipmentCard shipment={s} showPayment={true} />
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            {selectedShipment ? (
              <div className="bg-white border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Suivi de l\u0027envoi</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-gray-400" /><span>{selectedShipment.origin_city} → {selectedShipment.destination_city}</span></div>
                  <div className="flex items-center space-x-2"><Weight className="w-4 h-4 text-gray-400" /><span>{selectedShipment.weight} kg</span></div>
                  <div className="flex items-center space-x-2"><span className="font-medium">Prix : {formatPrice(selectedShipment.price, selectedShipment.currency)}</span></div>
                  <div><StatusBadge status={selectedShipment.status} /></div>
                </div>
                <TrackingTimeline currentStatus={selectedShipment.status} />

                {tracking.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Historique</h4>
                    <div className="space-y-2 text-sm">
                      {tracking.map((t) => (
                        <div key={t.id} className="text-gray-600">
                          <span className="font-medium">{formatDate(t.updated_at)}</span> — {t.description || t.status}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border rounded-lg p-6 text-center text-gray-500">
                <p>Sélectionnez un envoi pour voir le suivi.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
