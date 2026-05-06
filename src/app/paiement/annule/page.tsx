import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaiementAnnulePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
      <h1 className="text-2xl font-bold mb-4">Paiement annulé</h1>
      <p className="text-gray-600 mb-8">
        Le paiement a été annulé ou a échoué. Aucun montant n'a été débité. Vous pouvez réessayer à tout moment.
      </p>
      <Link href="/dashboard" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-800 transition inline-block">
        Retour à mon espace
      </Link>
    </div>
  );
}
