import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
  {
    slug: 'client-followup',
    name: 'Client Follow-Up Automator',
    description: 'Never lose a customer to silence. Auto-send thank-you notes, check-in emails, and review requests — timed perfectly.',
    icon: '📧',
    category: 'Automated Emails',
    prompt: `You are a professional email copywriter. Generate a series of follow-up emails based on the client's details. 
The emails should be warm, professional, and personalized. 
Generate exactly 3 emails:
1. Thank-you email (send right after service)
2. Check-in email (1 week later)
3. Review request email (2 weeks later)

Format each email with a subject line and body. Use [Client Name] and [Your Name] as placeholders.`,
    fields: JSON.stringify([
      { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Sarah Johnson' },
      { key: 'serviceProvided', label: 'Service Provided', type: 'text', placeholder: 'e.g. Website redesign consultation' },
      { key: 'yourName', label: 'Your Name', type: 'text', placeholder: 'e.g. Alex' },
      { key: 'companyName', label: 'Company/Brand Name', type: 'text', placeholder: 'e.g. Creative Studios' },
      { key: 'tone', label: 'Email Tone', type: 'select', options: ['Professional', 'Warm & Friendly', 'Casual'], default: 'Warm & Friendly' }
    ])
  },
  {
    slug: 'content-repurpose',
    name: 'Content Repurposer',
    description: 'Turn one blog post, podcast, or video into a Twitter thread, LinkedIn article, and newsletter summary.',
    icon: '📤',
    category: 'Multi-Platform',
    prompt: `You are a content strategist. Take the user's content and repurpose it for multiple platforms.
Generate the following:
1. A Twitter/X thread (5-8 tweets, each with a hook and key point)
2. A LinkedIn post (professional, thought-leadership style, 200-400 words)
3. A newsletter summary (concise, scannable, 150-250 words)

Keep the core message consistent while adapting tone to each platform.`,
    fields: JSON.stringify([
      { key: 'contentType', label: 'Content Type', type: 'select', options: ['Blog Post', 'Podcast Episode', 'Video', 'Article', 'Notes/Ideas'], default: 'Blog Post' },
      { key: 'title', label: 'Title / Topic', type: 'text', placeholder: 'e.g. 10 Ways to Boost Productivity' },
      { key: 'contentSummary', label: 'Content / Key Points', type: 'textarea', placeholder: 'Paste your content or summarize the key points...' },
      { key: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Small business owners, designers, etc.' }
    ])
  },
  {
    slug: 'weekly-report',
    name: 'Weekly Report Generator',
    description: 'Jotted down a few notes this week? Taskmatic turns your scraps into a polished client-ready report in under 30 seconds.',
    icon: '📊',
    category: 'PDF Export',
    prompt: `You are a professional report writer. Take the user's rough notes and transform them into a polished, client-ready weekly report.

The report should include:
1. A brief executive summary (2-3 sentences)
2. Key accomplishments section (bullet points)
3. Metrics/Highlights section (if applicable)
4. Next week's priorities (3-5 items)
5. A closing note

Format it professionally with clear section headers. Keep it concise but thorough.`,
    fields: JSON.stringify([
      { key: 'projectName', label: 'Project / Client Name', type: 'text', placeholder: 'e.g. ABC Corp Website Redesign' },
      { key: 'weekEnding', label: 'Week Ending', type: 'text', placeholder: 'e.g. June 7, 2026' },
      { key: 'notes', label: 'Your Notes', type: 'textarea', placeholder: 'Paste your rough notes, bullet points, or free-form thoughts about this week...' },
      { key: 'reportStyle', label: 'Report Style', type: 'select', options: ['Professional', 'Concise', 'Detailed'], default: 'Professional' }
    ])
  }
];

async function main() {
  console.log('Seeding templates...');
  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    });
    console.log(`  ✅ ${t.name}`);
  }
  console.log('Done!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
