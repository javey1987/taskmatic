// app/blog/[slug]/page.tsx — Individual blog post page
'use client';

import { useParams } from 'next/navigation';
import { blogPosts } from '../posts';

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
        <h2>Post not found</h2>
        <a href="/blog" style={{ color: 'var(--brand)' }}>← Back to Blog</a>
      </div>
    );
  }

  // Render markdown-like content as HTML paragraphs/sections
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize:'1.2rem', fontWeight:700, marginTop:28, marginBottom:8 }}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize:'1.05rem', fontWeight:700, marginTop:20, marginBottom:6 }}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight:700, marginTop:12, marginBottom:4 }}>{line.replace(/\*\*/g, '')}</p>;
      if (line.startsWith('- ')) return <li key={i} style={{ marginLeft:20, marginBottom:4, fontSize:'0.92rem', lineHeight:1.6 }}>{line.replace('- ', '')}</li>;
      if (line.startsWith('|')) return <span key={i} style={{ fontSize:'0.85rem', whiteSpace:'pre-wrap' }}>{line}{'\n'}</span>;
      if (line.startsWith('👉') || line.startsWith('**💡')) return <p key={i} style={{ fontSize:'0.95rem', marginTop:12, padding:'12px 16px', background:'var(--brand-bg)', borderRadius:10, lineHeight:1.6 }}>{line}</p>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} style={{ marginBottom:6, lineHeight:1.7, fontSize:'0.92rem' }}>{line}</p>;
    });
  };

  return (
    <>
      <style>{`
        .bp-page { min-height:100vh; background:var(--bg-base); }
        .bp-content { max-width:680px; margin:0 auto; padding:40px 24px 80px; }
        .bp-content h1 { font-size:1.6rem; font-weight:800; line-height:1.2; margin-bottom:12px; }
      `}</style>

      <div className="bp-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <a href="/blog" style={{ color:'var(--brand)', fontSize:'0.88rem', textDecoration:'none', fontWeight:600 }}>← Blog</a>
          </nav>
        </div>

        <div className="bp-content">
          <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
            {post.tags.map(t => <span key={t} style={{ fontSize:'.72rem', fontWeight:600, color:'var(--brand)', background:'var(--brand-bg)', padding:'2px 10px', borderRadius:12 }}>{t}</span>)}
          </div>
          <h1>{post.title}</h1>
          <div style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:32, display:'flex', gap:16 }}>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <div>{renderContent(post.content)}</div>

          <div style={{ marginTop:48, padding:'28px', background:'linear-gradient(135deg, var(--brand), oklch(48% 0.22 270))', borderRadius:16, textAlign:'center' }}>
            <h3 style={{ color:'#fff', fontSize:'1.1rem', marginBottom:6 }}>🚀 Try Taskmatic Free</h3>
            <p style={{ color:'oklch(85% 0.03 260 / 0.9)', fontSize:'0.88rem', marginBottom:14 }}>Automate client follow-ups, content repurposing, social posts, and reports — in 30 seconds.</p>
            <a href="/register" style={{ display:'inline-block', background:'#fff', color:'var(--brand)', padding:'10px 28px', borderRadius:10, fontWeight:700, fontSize:'0.88rem', textDecoration:'none' }}>Get Started Free →</a>
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'24px 0' }}>
          <div className="container" style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.8rem' }}>© 2026 Taskmatic</div>
        </footer>
      </div>
    </>
  );
}
