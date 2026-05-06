import DevisForm from '@/components/DevisForm';
import { FileText } from 'lucide-react';

export default function DevisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold">Demander un devis</h1>
        <p className="text-gray-600 mt-2">Remplissez le formulaire ci-dessous. Le prix est calculé automatiquement.</p>
      </div>
      <DevisForm />
    </div>
  );
}
