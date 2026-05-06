'use client';

import Link from 'next/link';
import { Package, MapPin, Calendar, Euro } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import PaymentButton from './PaymentButton';
import type { Shipment } from '@/types';

interface ShipmentCardProps {
  shipment: Shipment;
  showPayment?: boolean;
}

export default function ShipmentCard({ shipment, showPayment = false }: ShipmentCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-primary" />
          <span className="font-semibold text-gray-900">{shipment.type.toUpperCase()}</span>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{shipment.origin_city} → {shipment.destination_city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{formatDate(shipment.created_at)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Euro className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{formatPrice(shipment.price, shipment.currency)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/dashboard?shipment=${shipment.id}`}
          className="text-primary hover:underline text-sm"
        >
          Voir le suivi
        </Link>
        {showPayment && shipment.status === 'approuve' && (
          <PaymentButton shipmentId={shipment.id} amount={shipment.price} currency={shipment.currency} />
        )}
      </div>
    </div>
  );
}
