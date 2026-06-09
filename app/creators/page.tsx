// app/creators/page.tsx — Featured Creators
const creators = [
  {
    name: 'Sarah Chen',
    handle: '@sarahchen',
    avatar: 'SC',
    bg: 'oklch(70% 0.12 260 / 0.12)',
    role: 'Freelance Designer',
    templates: 4,
    featured: [
      { name: 'Client Follow-Up Automator', slug: 'client-followup', runs: 128 },
      { name: 'Social Post Generator', slug: 'social-poster', runs: 94 },
    ],
    quote: 'I use Taskmatic templates for every client project. Saves me 5+ hours per week.',
  },
  {
    name: 'Marcus Johnson',
    handle: '@marcusj',
    avatar: 'MJ',
    bg: 'oklch(62% 0.18 145 / 0.12)',
    role: 'SaaS Founder',
    templates: 3,
    featured: [
      { name: 'Cold Email Engine', slug: 'cold-email', runs: 312 },
      { name: 'Market Research Assistant', slug: 'market-research', runs: 87 },
      { name: 'Business Email Kit', slug: 'business-email-kit', runs: 56 },
    ],
    quote: 'The Cold Email Engine alone replaced my outreach team. 40% reply rate increase.',
  },
  {
    name: 'Elena Rodriguez',
    handle: '@elenarod',
    avatar: 'ER',
    bg: 'oklch(55% 0.18 200 / 0.12)',
    role: 'Digital Marketer',
    templates: 5,
    featured: [
      { name: 'SEO Blog Writer', slug: 'seo-blog-writer', runs: 210 },
      { name: 'Content Repurposer', slug: 'content-repurpose', runs: 145 },
    ],
    quote: 'I publish 3x more content since using Taskmatic. The SEO Blog Writer is a game changer.',
  },
  {
    name: 'Akira Tanaka',
    handle: '@akirat',
    avatar: 'AT',
    bg: 'oklch(65% 0.15 15 / 0.12)',
    role: 'Agency Owner',
    templates: 6,
    featured: [
      { name: 'Invoice Generator', slug: 'invoice-generator', runs: 445 },
      { name: 'Weekly Report Generator', slug: 'weekly-report', runs: 278 },
    ],
    quote: 'Invoice Generator paid for itself in day one. My clients love the professional formatting.',
  },
  {
    name: 'Priya Patel',
    handle: '@priyap',
    avatar: 'PP',
    bg: 'oklch(58% 0.12 290 / 0.12)',
    role: 'Freelance Writer',
    templates: 3,
    featured: [
      { name: 'Business Email Kit', slug: 'business-email-kit', runs: 167 },
      { name: 'SEO Blog Writer', slug: 'seo-blog-writer', runs: 92 },
    ],
    quote: 'I charge clients more because my emails and proposals look 10x more professional now.',
  },
  {
    name: 'David Kim',
    handle: '@davidk',
    avatar: 'DK',
    bg: 'oklch(62% 0.16 80 / 0.12)',
    role: 'Consultant',
    templates: 4,
    featured: [
      { name: 'Weekly Report Generator', slug: 'weekly-report', runs: 195 },
      { name: 'Market Research Assistant', slug: 'market-research', runs: 73 },
    ],
    quote: 'Weekly Report Generator is my favorite. Client feedback improved dramatically.',
  },
];

export default function CreatorsPage() {
  return (
    <>
      <style>{`
        .cr-page { min-height: 100vh; background: var(--bg-base); }
        .cr-hero { text-align: center; padding: 52px 0 36px; }
        .cr-hero h1 { font-size: clamp(1.6rem,3.5vw,2.2rem); font-weight: 800; }
        .cr-hero h1 span { color: var(--brand); }
        .cr-hero p { color: var(--text-secondary); max-width:520px; margin:8px auto 24px; font-size: 0.92rem; }
        .cr-hero .badge { display: inline-block; background: var(--brand-bg); color: var(--brand); font-size: 0.78rem; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-bottom: 12px; }
        .cr-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; padding-bottom: 80px; }
        .cr-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: transform .2s,box-shadow .2s; }
        .cr-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px oklch(0% 0 0/0.06); }
        .cr-card-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .cr-avatar { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
        .cr-name { font-weight: 700; font-size: 0.95rem; }
        .cr-handle { color: var(--text-muted); font-size: 0.78rem; }
        .cr-role { font-size: 0.8rem; color: var(--text-secondary); }
        .cr-quote { font-size: 0.85rem; font-style: italic; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; padding-left: 12px; border-left: 2px solid var(--brand); }
        .cr-templates-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .cr-tpl-list { display: flex; flex-direction: column; gap: 6px; }
        .cr-tpl-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; }
        .cr-tpl-name { color: var(--text-primary); text-decoration: none; }
        .cr-tpl-name:hover { color: var(--brand); }
        .cr-tpl-runs { color: var(--text-muted); font-size: 0.75rem; background: var(--bg-base); padding: 2px 8px; border-radius: 8px; }
        .cr-cta { text-align: center; padding: 40px 0 60px; border-top: 1px solid var(--border); }
        .cr-cta h2 { font-size: 1.2rem; font-weight: 800; margin-bottom: 6px; }
        .cr-cta p { color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 20px; }
        .cr-cta a { display: inline-block; background: var(--brand); color: #fff; padding: 12px 32px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: transform .15s; }
        .cr-cta a:hover { transform: translateY(-2px); }
        @media (max-width:800px) { .cr-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="cr-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <a href="/templates" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Templates</a>
              <a href="/free/social-post" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Free Tools</a>
              <a href="/blog" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Blog</a>
              <a href="/register" style={{ background:'var(--brand)', color:'#fff', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:'.85rem', textDecoration:'none' }}>Join as Creator</a>
            </div>
          </nav>
        </div>

        <div className="container">
          <div className="cr-hero">
            <span className="badge">🌟 Featured Creators</span>
            <h1>Built by the <span>Community</span></h1>
            <p>These power users create, share, and perfect Taskmatic templates. Join them — build a template, get featured.</p>
          </div>

          <div className="cr-grid">
            {creators.map((c) => (
              <div className="cr-card" key={c.handle}>
                <div className="cr-card-top">
                  <div className="cr-avatar" style={{ background: c.bg }}>{c.avatar}</div>
                  <div>
                    <div className="cr-name">{c.name}</div>
                    <div className="cr-handle">{c.handle} · {c.templates} templates</div>
                    <div className="cr-role">{c.role}</div>
                  </div>
                </div>
                <div className="cr-quote">&ldquo;{c.quote}&rdquo;</div>
                <div className="cr-templates-label">Featured Templates</div>
                <div className="cr-tpl-list">
                  {c.featured.map(tpl => (
                    <div className="cr-tpl-item" key={tpl.slug}>
                      <a href={`/templates/${tpl.slug}`} className="cr-tpl-name">{tpl.name}</a>
                      <span className="cr-tpl-runs">{tpl.runs} runs</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cr-cta">
            <h2>Want to become a Featured Creator?</h2>
            <p>Build a template, share it with the community, and get featured here. Top creators earn revenue share.</p>
            <a href="/register">Apply as Creator →</a>
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'32px 0 20px' }}>
          <div className="container" style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontWeight:700 }}>Task<span style={{ color:'var(--brand)' }}>matic</span></div>
            <div style={{ display:'flex', gap:20 }}>
              <a href="/templates" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Templates</a>
              <a href="/creators" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Creators</a>
              <a href="/free/social-post" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Free Tools</a>
              <a href="/blog" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Blog</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
