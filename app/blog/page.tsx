// app/blog/page.tsx — Taskmatic Blog
'use client';

const posts = [
  {
    slug: 'best-ai-automation-tools-for-freelancers-2026',
    title: '5 Best AI Automation Tools for Freelancers in 2026',
    excerpt: 'Stop burning out on busywork. Here are the AI tools every solo business owner should know about — including how to get started for free.',
    date: 'June 8, 2026',
    readTime: '5 min read',
    tags: ['AI Tools', 'Freelancing'],
  },
  {
    slug: 'how-to-automate-client-follow-ups',
    title: 'How to Automate Client Follow-Ups (Without Being Robotic)',
    excerpt: 'Client follow-ups are the highest-ROI activity most freelancers neglect. Here\'s how to automate them while keeping it personal.',
    date: 'June 7, 2026',
    readTime: '4 min read',
    tags: ['Client Management', 'Automation'],
  },
  {
    slug: 'content-repurposing-guide-solopreneurs',
    title: 'The Solopreneur\'s Guide to Content Repurposing',
    excerpt: 'One piece of content, four platforms, zero extra effort. Learn how to repurpose like a pro without spending hours.',
    date: 'June 6, 2026',
    readTime: '6 min read',
    tags: ['Content Marketing', 'Productivity'],
  },
];

export default function BlogPage() {
  return (
    <>
      <style>{`
        .blog-page { min-height: 100vh; background: var(--bg-base); }
        .blog-hero { text-align: center; padding: 48px 0 32px; }
        .blog-hero h1 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; }
        .blog-hero h1 span { color: var(--brand); }
        .blog-hero p { color: var(--text-secondary); max-width: 480px; margin: 8px auto 0; }
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; padding-bottom: 80px; }
        .blog-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; transition: transform .2s; cursor: default; }
        .blog-card:hover { transform: translateY(-3px); }
        .blog-card .tags { display: flex; gap: 8px; margin-bottom: 12px; }
        .blog-card .tags span { font-size: .72rem; font-weight: 600; color: var(--brand); background: var(--brand-bg); padding: 2px 10px; border-radius: 12px; }
        .blog-card h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
        .blog-card p { font-size: .88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
        .blog-card .meta { font-size: .8rem; color: var(--text-muted); display: flex; gap: 16px; }
      `}</style>

      <div className="blog-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <a href="/free/social-post" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Free Tools</a>
              <a href="/blog" style={{ color:'var(--brand)', fontSize:'.85rem', textDecoration:'none', fontWeight:600 }}>Blog</a>
              <a href="/register" style={{ background:'var(--brand)', color:'#fff', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:'.85rem', textDecoration:'none' }}>Get Started</a>
            </div>
          </nav>
        </div>

        <div className="container">
          <div className="blog-hero">
            <h1>Taskmatic <span>Blog</span></h1>
            <p>Tips, guides, and strategies for solo business owners who want to work smarter, not harder.</p>
          </div>
        </div>

        <div className="container">
          <div className="blog-grid">
            {posts.map(post => (
              <article key={post.slug} className="blog-card">
                <div className="tags">{post.tags.map(t => <span key={t}>{t}</span>)}</div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'32px 0 20px' }}>
          <div className="container" style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontWeight:700 }}>Task<span style={{ color:'var(--brand)' }}>matic</span></div>
            <div style={{ display:'flex', gap:20 }}>
              <a href="/free/social-post" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Social Post Gen</a>
              <a href="/free/thankyou-email" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Thank-You Email</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
