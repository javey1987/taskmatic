// app/api/research/route.ts — Live Market Research (searches web + AI synthesis)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query, industry, platforms } = await req.json();
    if (!query) return NextResponse.json({ error: 'Research query required' }, { status: 400 });

    // Step 1: Gather intel from multiple sources
    const sources: string[] = [];

    // GitHub: search repos and issues
    try {
      const gh = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+sort:stars&per_page=5`,
        { headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'taskmatic/1.0' } }
      );
      if (gh.ok) {
        const ghData = await gh.json();
        const repos = (ghData.items || []).slice(0, 5)
          .map((r: any) => `[GitHub] ${r.full_name} (⭐${r.stargazers_count}) — ${r.description || ''}`);
        if (repos.length) sources.push('### GitHub Projects\n' + repos.join('\n'));
      }
    } catch {}

    // Reddit: search discussions
    try {
      const rd = await fetch(
        `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=10&sort=top&t=year`,
        { headers: { 'User-Agent': 'taskmatic-research/1.0' } }
      );
      if (rd.ok) {
        const rdData = await rd.json();
        const posts = (rdData.data?.children || []).slice(0, 8)
          .map((c: any) => `[Reddit r/${c.data.subreddit}] ${c.data.title} (↑${c.data.score})`);
        if (posts.length) sources.push('### Reddit Discussions\n' + posts.join('\n'));
      }
    } catch {}

    // Web search via Jina Reader
    try {
      const jina = await fetch(`https://r.jina.ai/https://www.google.com/search?q=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'taskmatic/1.0' },
        signal: AbortSignal.timeout(5000),
      });
      if (jina.ok) {
        const text = await jina.text();
        const lines = text.split('\n').filter(l => l.includes('http')).slice(0, 8);
        if (lines.length) sources.push('### Web Results\n' + lines.join('\n'));
      }
    } catch {}

    const context = sources.join('\n\n') || 'No live data available. Relying on AI knowledge.';

    // Step 2: AI synthesizes the research report
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        report: generateFallbackReport(query, industry || 'general'),
        sources: sources.length,
        note: 'Demo mode — add DEEPSEEK_API_KEY for AI-powered reports',
      });
    }

    const systemPrompt = `You are a market research analyst. Create a concise, actionable research report based on the search results and your knowledge.

Structure the report:
1. **Market Overview** — current state, trends, size
2. **Key Players** — notable companies/projects with differentiators
3. **Pain Points & Opportunities** — what customers struggle with, gaps
4. **Strategic Recommendations** — actionable next steps
5. **Sources & References** — what was found online

Keep it practical, data-driven, and under 800 words. Use bullet points for readability.`;

    const userMessage = `Research Query: ${query}\nIndustry/Context: ${industry || 'General'}\n\nLive Search Results:\n${context}\n\nGenerate a market research report.`;

    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 2048,
        temperature: 0.5,
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
    const data = await res.json();
    const report = data.choices[0]?.message?.content?.trim();

    return NextResponse.json({
      report: report || 'No report generated.',
      sources: sources.length,
    });
  } catch (err: any) {
    return NextResponse.json({
      report: generateFallbackReport('your query', 'general'),
      error: err.message,
    });
  }
}

function generateFallbackReport(query: string, industry: string) {
  return `## Market Research: ${query}

### Market Overview
The ${industry || 'current'} market is experiencing significant growth driven by digital transformation and AI adoption. Small businesses and freelancers are increasingly seeking automation tools that don't require technical expertise.

### Key Trends
- **No-code automation** is the dominant trend — users want results, not tools
- **AI-powered content creation** is becoming standard expectation
- **Freelancer economy** continues expanding, driving demand for solo-business tools

### Opportunities
- Pre-built templates (vs. DIY workflow builders) is an underserved niche
- Free-to-paid funnel with SEO-optimized tools is proven effective
- Integration with existing tools (email, calendar, social platforms) is key

### Recommendations
1. Focus on "instant value" — users should get results in <30 seconds
2. Build SEO content around specific use cases (not generic AI)
3. Consider partnerships with freelance platforms and communities

*Note: This is a template report. For real-time data, run this research with DeepSeek API configured.*`;
}
