// app/api/waitlist/route.ts — Email waitlist for Paddle approval
import { NextRequest, NextResponse } from 'next/server';

// In-memory for MVP (in production: use database)
const waitlist: { email: string; createdAt: Date }[] = [];

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 });
    }

    const existing = waitlist.find(w => w.email === email.toLowerCase());
    if (existing) {
      return NextResponse.json({ message: "You're already on the list!" });
    }

    waitlist.push({ email: email.toLowerCase(), createdAt: new Date() });
    console.log(`[Waitlist] New signup: ${email}`);

    return NextResponse.json({ 
      message: "You're on the list! We'll notify you when payments are ready.",
      position: waitlist.length
    });
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
