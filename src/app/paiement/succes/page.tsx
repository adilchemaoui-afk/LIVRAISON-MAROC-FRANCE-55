import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaiementSuccesPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
      <h1 className="text-2xl font-bold mb-4">Paiement confirmé !</h1>
      <p className="text-gray-600 mb-8">
        Votre paiement a été traité avec succès. Vous recevrez un email de confirmation dans quelques minutes.
      </p>
      <Link href="/dashboard" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-800 transition inline-block">
        Voir mes envois
      </Link>
    </div>
  );
}
