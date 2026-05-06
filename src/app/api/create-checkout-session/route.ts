import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { shipmentId, amount, currency } = await req.json();

    // Update shipment status to prevent double payment
    const { data: shipment } = await supabaseAdmin
      .from('shipments')
      .select('*')
      .eq('id', shipmentId)
      .single();

    if (!shipment) {
      return NextResponse.json({ error: 'Envoi non trouvé' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Transport ${shipment.type} — ${shipment.origin_city} → ${shipment.destination_city}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/succes`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/annule`,
      metadata: { shipment_id: shipmentId },
    });

    // Record payment pending
    await supabaseAdmin.from('payments').insert({
      shipment_id: shipmentId,
      stripe_session_id: session.id,
      amount,
      currency,
      status: 'pending',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Erreur Stripe' }, { status: 500 });
  }
}
