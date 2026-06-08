// app/api/free/email-reply/route.ts — Free AI Email Reply Generator
import { NextRequest, NextResponse } from 'next/server';

const PROMPT = `You are a professional email writer. Generate ONE email reply based on the user's situation.
Rules:
- Write a clear, helpful email reply
- Subject line: "Re: [original subject]"
- Match the tone the user requests
- Keep it 100-200 words
- Output only the email content`;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Free limit reached. 5 per hour.' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const context = searchParams.get('context')?.trim() || 'a client asking about project status';
  const tone = searchParams.get('tone') || 'Professional';

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (apiKey) {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-v4-flash',
          messages: [
            { role: 'system', content: PROMPT },
            { role: 'user', content: `Situation: ${context}\nTone: ${tone}\n\nWrite a professional email reply.` },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.choices[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply, demo: false });
      }
    }
  } catch {}

  // Fallback
  const t = tone === 'Professional' ? 'I understand your concern' : tone === 'Friendly' ? 'Thanks for reaching out!' : 'Got it';
  return NextResponse.json({
    reply: `Subject: Re: Your recent message\n\nHi there,\n\n${t} regarding ${context}.\n\nI've reviewed your request and will get back to you with a detailed response within 24 hours. If you need anything sooner, feel free to reply directly to this email.\n\nBest regards,\n[Your Name]`,
    demo: true,
  });
}
