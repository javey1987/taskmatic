// Simple in-memory store that works everywhere (including Vercel serverless)
// Note: data resets on cold starts (acceptable for MVP)

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  plan: string;
  createdAt: Date;
}

interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  prompt: string;
  fields: string;
  createdAt: Date;
}

interface Run {
  id: string;
  userId: string;
  templateId: string;
  input: string;
  output: string;
  createdAt: Date;
}

// Templates are static - seeded data
const templates: Template[] = [
  {
    id: 't1',
    slug: 'client-followup',
    name: 'Client Follow-Up Automator',
    description: 'Never lose a customer to silence. Auto-send thank-you notes, check-in emails, and review requests.',
    icon: '📧',
    category: 'Automated Emails',
    prompt: `You are a professional email copywriter. Generate a series of follow-up emails based on the client's details. 
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
    ]),
    createdAt: new Date(),
  },
  {
    id: 't2',
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
      { key: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Small business owners' }
    ]),
    createdAt: new Date(),
  },
  {
    id: 't3',
    slug: 'weekly-report',
    name: 'Weekly Report Generator',
    description: 'Jotted down a few notes this week? Taskmatic turns your scraps into a polished client-ready report.',
    icon: '📊',
    category: 'PDF Export',
    prompt: `You are a professional report writer. Take the user's rough notes and transform them into a polished, client-ready weekly report.

The report should include:
1. A brief executive summary (2-3 sentences)
2. Key accomplishments section (bullet points)
3. Metrics/Highlights section (if applicable)
4. Next week's priorities (3-5 items)
5. A closing note

Format it professionally with clear section headers.`,
    fields: JSON.stringify([
      { key: 'projectName', label: 'Project / Client Name', type: 'text', placeholder: 'e.g. ABC Corp Website Redesign' },
      { key: 'weekEnding', label: 'Week Ending', type: 'text', placeholder: 'e.g. June 7, 2026' },
      { key: 'notes', label: 'Your Notes', type: 'textarea', placeholder: 'Paste your rough notes, bullet points, or free-form thoughts...' },
      { key: 'reportStyle', label: 'Report Style', type: 'select', options: ['Professional', 'Concise', 'Detailed'], default: 'Professional' }
    ]),
    createdAt: new Date(),
  }
];

// In-memory stores
const users = new Map<string, User>();
const runs: Run[] = [];

let nextId = 1000;
function genId() { return `id_${nextId++}`; }

export const store = {
  // Templates
  getTemplates() {
    return templates.map(({ prompt, ...rest }) => rest); // Don't expose prompts to client
  },
  getTemplateBySlug(slug: string) {
    return templates.find(t => t.slug === slug) || null;
  },

  // Users
  findUserByEmail(email: string) {
    return users.get(email.toLowerCase()) || null;
  },
  findUserById(id: string) {
    for (const user of users.values()) {
      if (user.id === id) return user;
    }
    return null;
  },
  createUser(email: string, password: string, name: string) {
    const user: User = {
      id: genId(),
      email: email.toLowerCase(),
      name,
      password,
      plan: 'free',
      createdAt: new Date(),
    };
    users.set(email.toLowerCase(), user);
    return user;
  },

  // Runs
  getMonthlyRuns(userId: string) {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    return runs.filter(r => r.userId === userId && r.createdAt >= monthStart).length;
  },
  createRun(userId: string, templateId: string, input: string, output: string) {
    const run: Run = {
      id: genId(),
      userId,
      templateId,
      input,
      output,
      createdAt: new Date(),
    };
    runs.push(run);
    return run;
  },
};
