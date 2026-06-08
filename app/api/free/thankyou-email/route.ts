// app/api/free/thankyou-email/route.ts — Free Thank-You Email Generator
import { NextRequest, NextResponse } from 'next/server';

const PROMPT = `You are a professional email copywriter. Generate ONE thank-you email based on the user's details.
Rules:
- Write a warm, professional thank-you email
- Subject line first, then body
- Include placeholders in [brackets] where personalization makes sense
- Keep it 150-250 words
- End with a subtle invitation to stay in touch
- Output only the email content (subject + body), no explanations`;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Free limit reached. 3 per hour.' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const clientName = searchParams.get('clientName')?.trim() || '[Client Name]';
  const service = searchParams.get('service')?.trim() || '[Service Provided]';
  const userName = searchParams.get('userName')?.trim() || '[Your Name]';
  const tone = searchParams.get('tone') || 'Warm & Friendly';

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
            { role: 'user', content: `Client: ${clientName}\nService: ${service}\nYour Name: ${userName}\nTone: ${tone}` },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const email = data.choices[0]?.message?.content?.trim();
        if (email) return NextResponse.json({ email, demo: false });
      }
    }
  } catch {}

  // Fallback
  const tones: Record<string, string> = {
    'Professional': `Subject: Thank You — ${service}\n\nDear ${clientName},\n\nI wanted to take a moment to thank you for choosing [Company Name] for ${service}. It was a pleasure working with you, and I'm excited about the results we've achieved together.\n\nIf there's anything else I can help you with, please don't hesitate to reach out. I'd love to continue supporting your success.\n\nBest regards,\n${userName}`,
    'Warm & Friendly': `Subject: Thanks so much! 🙌\n\nHi ${clientName},\n\nJust wanted to say a huge thank you for trusting me with ${service}. It means the world to me that you chose to work together!\n\nI hope you're loving the results. If anything comes up or you just want to chat, my inbox is always open.\n\nCheers,\n${userName} 🙂`,
    'Short & Sweet': `Subject: Thanks!\n\nHey ${clientName},\n\nQuick note to say thanks for ${service}. Really appreciate you!\n\nLet me know if you need anything else.\n\n— ${userName}`,
  };

  return NextResponse.json({ email: tones[tone] || tones['Warm & Friendly'], demo: true });
}
