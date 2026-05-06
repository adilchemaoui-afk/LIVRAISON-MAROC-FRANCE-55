'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  CreditCard,
  Users,
  ChevronLeft,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/devis', label: 'Devis', icon: ClipboardList },
  { href: '/admin/shipments', label: 'Envois', icon: Truck },
  { href: '/admin/payments', label: 'Paiements', icon: CreditCard },
  { href: '/admin/clients', label: 'Clients', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
          <ChevronLeft className="w-5 h-5" />
          <span>Retour au site</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center space-x-3 px-4 py-3 rounded-md transition',
              pathname === href
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
