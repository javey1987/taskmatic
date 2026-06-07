import { NextResponse } from 'next/server';
import { auth } from '../../lib/auth';
import { store } from '../../lib/store';
import { callDeepSeek } from '../../lib/deepseek';

export async function GET() {
  const templates = store.getTemplates();
  return NextResponse.json(templates);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const user = store.findUserById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Check usage limits
  const monthlyRuns = store.getMonthlyRuns(userId);
  const limits: Record<string, number> = { free: 5, pro: 50, unlimited: 9999 };
  const limit = limits[user.plan] || 5;

  if (monthlyRuns >= limit) {
    return NextResponse.json({ error: `Monthly limit reached (${limit}/${limit}). Upgrade your plan.` }, { status: 403 });
  }

  const { templateSlug, inputs } = await req.json();
  const template = store.getTemplateBySlug(templateSlug);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  // Format user input as a message for the AI
  const inputSummary = Object.entries(inputs)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  try {
    const output = await callDeepSeek(template.prompt, inputSummary);

    // Save the run
    store.createRun(userId, template.id, JSON.stringify(inputs), output);

    return NextResponse.json({ output, remaining: limit - monthlyRuns - 1 });
  } catch (error: any) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: error.message || 'AI generation failed' }, { status: 500 });
  }
}
