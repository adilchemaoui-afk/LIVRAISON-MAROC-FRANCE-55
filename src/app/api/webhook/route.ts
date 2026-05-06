import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const shipmentId = session.metadata?.shipment_id;

    if (shipmentId) {
      // Update payment
      await supabaseAdmin
        .from('payments')
        .update({
          status: 'completed',
          stripe_payment_intent_id: session.payment_intent,
          paid_at: new Date().toISOString(),
        })
        .eq('stripe_session_id', session.id);

      // Update shipment status
      await supabaseAdmin
        .from('shipments')
        .update({ status: 'paye', updated_at: new Date().toISOString() })
        .eq('id', shipmentId);

      // Add tracking update
      await supabaseAdmin.from('tracking_updates').insert({
        shipment_id: shipmentId,
        status: 'paye',
        description: 'Paiement confirmé',
      });

      // Get shipment for email
      const { data: shipment } = await supabaseAdmin
        .from('shipments')
        .select('*')
        .eq('id', shipmentId)
        .single();

      if (shipment) {
        // Email client
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: shipment.sender_email,
          subject: 'Paiement confirmé — Transport Maroc 2',
          html: `<p>Bonjour ${shipment.sender_name},</p><p>Votre paiement a été confirmé. Votre envoi est maintenant en préparation.</p><p>Merci de votre confiance.</p>`,
        });

        // Email admin
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.RESEND_FROM_EMAIL!,
          subject: 'Nouveau paiement reçu',
          html: `<p>Un paiement a été reçu pour l'envoi ${shipmentId}.</p><p>Montant : ${session.amount_total / 100} ${session.currency.toUpperCase()}</p>`,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
