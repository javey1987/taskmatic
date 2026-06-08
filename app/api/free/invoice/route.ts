// app/api/free/invoice/route.ts — Free Invoice Generator
import { NextRequest, NextResponse } from 'next/server';

const PROMPT = `You are a professional billing specialist. Generate a clean, professional invoice.

Include sections:
1. INVOICE header with number and dates
2. Bill To: client info
3. Itemized table: Description | Qty | Rate | Amount
4. Subtotal, Total
5. Payment Terms & Instructions

Format as plain text with clear sections. Use the specific amounts the user provides.`;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now(); const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 3600000 }); return true; }
  if (entry.count >= 5) return false; entry.count++; return true;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) return NextResponse.json({ error: 'Free limit reached. 5 per hour.' }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const clientName = searchParams.get('clientName') || 'Client';
  const yourName = searchParams.get('yourName') || 'Your Business';
  const services = searchParams.get('services') || 'Services';
  const invNum = searchParams.get('invoiceNumber') || 'INV-001';
  const terms = searchParams.get('paymentTerms') || 'Net 15';

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (apiKey) {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-v4-flash',
          messages: [{ role: 'system', content: PROMPT }, { role: 'user', content: `Client: ${clientName}\nFrom: ${yourName}\nServices:\n${services}\nInvoice #: ${invNum}\nPayment Terms: ${terms}` }],
          max_tokens: 800, temperature: 0.3,
        }),
      });
      if (res.ok) { const data = await res.json(); const inv = data.choices[0]?.message?.content?.trim(); if (inv) return NextResponse.json({ invoice: inv, demo: false }); }
    }
  } catch {}

  const lines = services.split('\n').filter(Boolean);
  let total = 0;
  const itemRows = lines.map(l => {
    const match = l.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    const amt = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    total += amt;
    return `  ${l}`;
  }).join('\n');

  return NextResponse.json({
    invoice: `========================================
              INVOICE
========================================
Invoice #: ${invNum}
Date: ${new Date().toLocaleDateString('en-US')}
Due Date: ${terms}

BILL TO:
  ${clientName}

FROM:
  ${yourName}

----------------------------------------------------
 SERVICES
----------------------------------------------------
${itemRows}

----------------------------------------------------
  Subtotal:       $${total.toFixed(2)}
  TOTAL DUE:      $${total.toFixed(2)}
----------------------------------------------------

Payment Terms: ${terms}

Thank you for your business!`,
    demo: true,
  });
}
