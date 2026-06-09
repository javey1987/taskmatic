// app/templates-page/page.tsx — Standalone Templates Landing Page
'use client';

const templates = [
  { icon: '📧', name: 'Client Follow-Up Automator', desc: 'Never lose a customer to silence. Auto-send thank-you notes, check-ins, and review requests.', tag: 'Automated Emails', slug: 'client-followup' },
  { icon: '📤', name: 'Content Repurposer', desc: 'Turn one blog post into a Twitter thread, LinkedIn article, and newsletter — in 30 seconds.', tag: 'Multi-Platform', slug: 'content-repurpose' },
  { icon: '📊', name: 'Weekly Report Generator', desc: 'Messy notes → polished client report. 30 seconds, no formatting required.', tag: 'PDF Export', slug: 'weekly-report' },
  { icon: '📱', name: 'Social Post Generator', desc: 'Write once, publish everywhere. Generate posts for Twitter, LinkedIn, Reddit & newsletters.', tag: 'Lead Generation', slug: 'social-poster' },
  { icon: '🔍', name: 'Market Research Assistant', desc: 'Research competitors, trends, and opportunities. AI searches the web for you.', tag: 'Research', slug: 'market-research' },
  { icon: '📨', name: 'Cold Email Engine', desc: 'Generate a complete cold outreach sequence — warm-up to follow-up, CAN-SPAM compliant.', tag: 'Sales', slug: 'cold-email' },
  { icon: '✍️', name: 'SEO Blog Writer', desc: 'SEO-optimized blog posts with headlines, meta descriptions, and keyword placement.', tag: 'Content', slug: 'seo-blog-writer' },
  { icon: '💼', name: 'Business Email Kit', desc: 'Professional emails for meetings, follow-ups, proposals, and more.', tag: 'Communication', slug: 'business-email-kit' },
  { icon: '📄', name: 'Invoice Generator', desc: 'Itemized invoices with payment terms, totals, and professional formatting.', tag: 'Finance', slug: 'invoice-generator' },
];

export default function TemplatesPage() {
  return (
    <>
      <style>{`
        .tp-page { min-height:100vh; background:var(--bg-base); }
        .tp-hero { text-align:center; padding:52px 0 36px; }
        .tp-hero h1 { font-size:clamp(1.6rem,3.5vw,2.2rem); font-weight:800; }
        .tp-hero h1 span { color:var(--brand); }
        .tp-hero p { color:var(--text-secondary); max-width:520px; margin:8px auto 24px; }
        .tp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; padding-bottom:80px; }
        .tp-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); padding:28px 24px; text-decoration:none; color:inherit; display:block; transition:transform .2s,box-shadow .2s; position:relative; overflow:hidden; }
        .tp-card:hover { transform:translateY(-3px); box-shadow:0 8px 30px oklch(0% 0 0/0.06); }
        .tp-card .icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; margin-bottom:14px; }
        .tp-card h3 { font-size:1rem; font-weight:700; margin-bottom:6px; }
        .tp-card p { font-size:.85rem; color:var(--text-secondary); line-height:1.6; margin-bottom:10px; }
        .tp-card .tag { display:inline-block; font-size:.72rem; font-weight:600; color:var(--brand); background:var(--brand-bg); padding:2px 10px; border-radius:12px; }
        .tp-card .arrow { position:absolute; right:16px; bottom:16px; color:var(--text-muted); font-size:1.1rem; transition:transform .2s; }
        .tp-card:hover .arrow { transform:translateX(4px); color:var(--brand); }
        .tp-free-banner { background:linear-gradient(135deg,var(--brand),oklch(48% .22 270)); border-radius:var(--radius); padding:36px 24px; text-align:center; margin-bottom:40px; }
        .tp-free-banner h2 { color:#fff; font-size:1.2rem; font-weight:800; margin-bottom:4px; }
        .tp-free-banner p { color:oklch(85% .03 260/.9); font-size:.88rem; margin-bottom:16px; max-width:500px; margin-left:auto; margin-right:auto; }
        .tp-free-banner .cta { display:inline-block; background:#fff; color:var(--brand); padding:12px 32px; border-radius:10px; font-weight:700; font-size:.9rem; text-decoration:none; transition:transform .15s; }
        .tp-free-banner .cta:hover { transform:translateY(-2px); }
        .tp-free-tools { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:12px; }
        .tp-free-tools a { color:oklch(90% .03 260/.9); font-size:.82rem; text-decoration:none; }
        .tp-free-tools a:hover { color:#fff; }
        @media (max-width:800px) { .tp-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="tp-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <a href="/free/social-post" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Free Tools</a>
              <a href="/blog" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Blog</a>
              <a href="/register" style={{ background:'var(--brand)', color:'#fff', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:'.85rem', textDecoration:'none' }}>Get Started</a>
            </div>
          </nav>
        </div>

        <div className="container">
          <div className="tp-hero">
            <h1>All <span>9 Templates</span></h1>
            <p>Pre-built AI workflows. No coding. No prompts. Pick one, fill in 3 fields, get results in 30 seconds.</p>
          </div>

          <div className="tp-free-banner">
            <h2>🔥 Try Before You Sign Up</h2>
            <p>Use our free AI tools instantly — no account needed. Generate Twitter posts, thank-you emails, and more.</p>
            <a href="/free/social-post" className="cta">Try Free Tools →</a>
            <div className="tp-free-tools">
              <a href="/free/social-post">📱 Social Post</a>
              <a href="/free/thankyou-email">✉️ Thank-You Email</a>
              <a href="/free/email-reply">📧 Email Reply</a>
              <a href="/free/research">🔍 Research</a>
              <a href="/free/invoice">📄 Invoice</a>
            </div>
          </div>

          <div className="tp-grid">
            {templates.map((t, i) => (
              <a key={t.slug} href={`/templates/${t.slug}`} className="tp-card">
                <div className="icon" style={{
                  background: [
                    'oklch(70% 0.12 260 / 0.15)', 'oklch(62% 0.18 145 / 0.15)', 'oklch(75% 0.25 290 / 0.15)',
                    'oklch(65% 0.15 35 / 0.15)', 'oklch(55% 0.18 200 / 0.15)', 'oklch(65% 0.15 15 / 0.15)',
                    'oklch(60% 0.14 120 / 0.15)', 'oklch(58% 0.12 290 / 0.15)', 'oklch(62% 0.16 80 / 0.15)'
                  ][i]
                }}>{t.icon}</div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                <span className="tag">{t.tag}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'32px 0 20px' }}>
          <div className="container" style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontWeight:700 }}>Task<span style={{ color:'var(--brand)' }}>matic</span></div>
            <div style={{ display:'flex', gap:20 }}>
              <a href="/blog" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Blog</a>
              <a href="/free/social-post" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Free Tools</a>
              <a href="/waitlist" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Join Waitlist</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
