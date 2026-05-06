import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
