// Free Social Post API — no auth required, IP rate limited
import { NextRequest, NextResponse } from 'next/server';

const FREE_SYSTEM_PROMPT = `You are a social media copywriter helping small business owners. 
Generate ONE Twitter/X post based on the user's business description.

Rules:
- Write exactly 1 post (1-2 tweets if it's a thread format, max 280 chars each)
- Include a strong hook in the first line
- End with a clear call-to-action
- Use relevant emojis (1-3 max)
- Add 2-3 relevant hashtags at the end
- Keep it conversational and engaging
- NEVER mention "Taskmatic" or "AI" — the post should sound like a real human wrote it
- Output only the post content, no explanations`;

// Simple in-memory IP rate limiter (resets on server restart — fine for MVP)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 free generations per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  entry.count++;
  return true;
}

export async function GET(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || req.headers.get('x-real-ip') 
    || 'unknown';
    
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit reached. Try again later or sign up for unlimited access.' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);
  const business = searchParams.get('business')?.trim();
  const audience = searchParams.get('audience')?.trim();
  const tone = searchParams.get('tone') || 'Warm & Friendly';

  if (!business || business.length < 10) {
    return NextResponse.json(
      { error: 'Please describe your business (at least 10 characters).' },
      { status: 400 }
    );
  }

  const userMessage = `Business: ${business}\nTarget Audience: ${audience || 'General'}\nTone: ${tone}\n\nGenerate a Twitter/X post.`;

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      // Fallback demo mode — return a sample post
      return NextResponse.json({
        post: generateFallback(business, audience || 'your ideal clients', tone),
        demo: true,
      });
    }

    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          { role: 'system', content: FREE_SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      throw new Error(`DeepSeek API error: ${res.status}`);
    }

    const data = await res.json();
    const post = data.choices[0]?.message?.content?.trim();
    
    if (!post) throw new Error('No response generated');

    return NextResponse.json({ post, demo: false });
  } catch (err: any) {
    console.error('Free Social Post API error:', err.message);
    // Fallback on error
    return NextResponse.json({
      post: generateFallback(business, audience || 'your ideal clients', tone),
      demo: true,
    });
  }
}

function generateFallback(business: string, audience: string, tone: string): string {
  const words = business.split(' ').filter(w => w.length > 4);
  const bizShort = words.slice(0, 2).join(' ') || 'what you do';
  
  const posts: Record<string, string> = {
    'Professional': `Most ${audience} I talk to are wasting time on the wrong things.\n\nThey spend hours on ${bizShort} when they could be focusing on growth.\n\nHere's the truth: the magic is in the system, not the hours.\n\nWhat's one thing you'd automate if you could? 👇\n\n#Productivity #SmallBusiness`,
    'Warm & Friendly': `Quick question for ${audience} 👋\n\nHow much time do you spend on ${bizShort} each week?\n\nIf the answer is "too much", you're not alone.\n\nThe good news? You don't have to do it all manually.\n\nStart small. Automate one thing. See what happens.\n\n#SmallBizTips #WorkSmarter`,
    'Funny': `Me: "I'll just spend 10 minutes on ${bizShort}"\n\nAlso me: *45 minutes later, still going, help*\n\nAnyone else feel personally attacked? 🙋‍♂️\n\nReal talk though — ${audience} deserve better tools.\n\n#EntrepreneurLife #Automation`,
    'Inspiring': `Your next breakthrough isn't about working harder.\n\nIt's about making ${bizShort} work FOR you, not the other way around.\n\n${audience} who automate their busywork don't just save time.\n\nThey buy back their most valuable asset: focus.\n\n#Mindset #BusinessGrowth`,
    'Bold': `Here's an unpopular opinion:\n\nMost ${audience} spend 80% of their time on ${bizShort} that could be automated.\n\nStop treating your time like it's infinite.\n\nAutomate the repetitive. Focus on what matters.\n\nThe results speak for themselves.\n\n#BoldTake #Efficiency`
  };

  return posts[tone] || posts['Warm & Friendly'];
}
