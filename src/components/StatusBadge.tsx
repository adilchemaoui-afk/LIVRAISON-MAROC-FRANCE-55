import { cn } from '@/lib/utils';
import type { ShipmentStatus } from '@/types';

const STATUS_STYLES: Record<ShipmentStatus, string> = {
  devis: 'bg-gray-100 text-gray-800',
  en_attente: 'bg-yellow-100 text-yellow-800',
  approuve: 'bg-blue-100 text-blue-800',
  paye: 'bg-green-100 text-green-800',
  en_preparation: 'bg-purple-100 text-purple-800',
  en_transit: 'bg-indigo-100 text-indigo-800',
  livre: 'bg-emerald-100 text-emerald-800',
  annule: 'bg-red-100 text-red-800',
};

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  devis: 'Devis',
  en_attente: 'En attente',
  approuve: 'Approuvé',
  paye: 'Payé',
  en_preparation: 'En préparation',
  en_transit: 'En transit',
  livre: 'Livré',
  annule: 'Annulé',
};

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
