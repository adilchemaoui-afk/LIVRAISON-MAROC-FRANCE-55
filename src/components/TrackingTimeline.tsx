import { CheckCircle, Circle, Truck, Package, Home } from 'lucide-react';
import type { ShipmentStatus } from '@/types';

const STATUS_STEPS: { status: ShipmentStatus; label: string; icon: React.ElementType }[] = [
  { status: 'devis', label: 'Devis demandé', icon: Package },
  { status: 'approuve', label: 'Devis approuvé', icon: CheckCircle },
  { status: 'paye', label: 'Paiement effectué', icon: CheckCircle },
  { status: 'en_preparation', label: 'En préparation', icon: Package },
  { status: 'en_transit', label: 'En transit', icon: Truck },
  { status: 'livre', label: 'Livré', icon: Home },
];

interface TrackingTimelineProps {
  currentStatus: ShipmentStatus;
}

export default function TrackingTimeline({ currentStatus }: TrackingTimelineProps) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className="space-y-4">
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              } ${isCurrent ? 'ring-2 ring-accent ring-offset-2' : ''}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.label}
              </p>
              {isCurrent && <p className="text-sm text-accent font-semibold">En cours</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
