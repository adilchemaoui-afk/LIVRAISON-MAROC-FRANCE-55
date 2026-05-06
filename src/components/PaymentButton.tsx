'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentButtonProps {
  shipmentId: string;
  amount: number;
  currency?: string;
}

export default function PaymentButton({ shipmentId, amount, currency = 'EUR' }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shipmentId, amount, currency }),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50 flex items-center space-x-2"
    >
      <CreditCard className="w-4 h-4" />
      <span>{loading ? 'Redirection...' : 'Payer'}</span>
    </button>
  );
}
