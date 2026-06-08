// app/free/email-reply/page.tsx — Free AI Email Reply Generator
'use client';

import { useState, useCallback } from 'react';

export default function FreeEmailReplyPage() {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.trim()) { setError('Please describe the situation.'); return; }
    setLoading(true); setError(''); setReply('');
    try {
      const params = new URLSearchParams({ context: context.trim(), tone });
      const res = await fetch(`/api/free/email-reply?${params}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed'); return; }
      setReply(data.reply);
    } catch { setError('Network error.'); } finally { setLoading(false); }
  }, [context, tone]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [reply]);

  return (
    <>
      <style>{`
        .er-page { min-height:100vh; background:var(--bg-base); }
        .er-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:32px; align-items:start; padding-bottom:80px; }
        .er-card { background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px; }
        .er-card h3 { font-size:1rem; font-weight:700; margin-bottom:16px; }
        .er-form-group { margin-bottom:14px; }
        .er-form-group label { display:block; font-weight:600; font-size:.85rem; margin-bottom:4px; }
        .er-form-group textarea, .er-form-group select { width:100%; padding:10px 14px; border:1px solid var(--border); border-radius:10px; font-size:.92rem; outline:none; background:var(--bg-base); font-family:inherit; }
        .er-form-group textarea:focus, .er-form-group select:focus { border-color:var(--brand); }
        .er-form-group textarea { resize:vertical; min-height:80px; }
        .er-btn { width:100%; padding:14px; border:none; border-radius:12px; background:var(--brand); color:#fff; font-weight:700; font-size:1rem; cursor:pointer; }
        .er-btn:hover:not(:disabled) { transform:translateY(-2px); }
        .er-btn:disabled { opacity:.6; cursor:not-allowed; }
        .er-reply { white-space:pre-wrap; line-height:1.7; font-size:.92rem; padding:16px; background:var(--bg-base); border-radius:10px; }
        .er-empty { display:flex; align-items:center; justify-content:center; min-height:200px; color:var(--text-muted); text-align:center; }
        .er-error { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; padding:12px 16px; border-radius:10px; margin-bottom:16px; font-size:.88rem; }
        .er-upgrade { background:linear-gradient(135deg,var(--brand),oklch(48% .22 270)); text-align:center; padding:32px 20px; border-radius:14px; margin-top:16px; }
        .er-upgrade h4 { color:#fff; font-size:1rem; font-weight:800; margin-bottom:4px; }
        .er-upgrade p { color:oklch(85% .03 260/.9); font-size:.82rem; margin-bottom:12px; }
        .er-upgrade a { display:inline-block; background:#fff; color:var(--brand); padding:10px 28px; border-radius:10px; font-weight:700; font-size:.85rem; text-decoration:none; }
        .er-free-badge { display:inline-block; background:#dcfce7; color:#166534; font-size:.75rem; font-weight:700; padding:4px 14px; border-radius:20px; margin-bottom:16px; }
        @media (max-width:800px) { .er-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="er-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <div style={{ display:'flex', gap:12 }}>
              <a href="/free/social-post" style={{ color:'var(--text-secondary)', fontSize:'.82rem', textDecoration:'none' }}>Social Post</a>
              <a href="/free/thankyou-email" style={{ color:'var(--text-secondary)', fontSize:'.82rem', textDecoration:'none' }}>Thank-You</a>
              <a href="/register" style={{ background:'var(--brand)', color:'#fff', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:'.85rem', textDecoration:'none' }}>Sign Up</a>
            </div>
          </nav>
        </div>

        <div className="container" style={{ textAlign:'center', padding:'40px 0 24px' }}>
          <div className="er-free-badge">✨ Free tool — no sign-up needed</div>
          <h1 style={{ fontSize:'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight:800 }}>Free AI <span style={{ color:'var(--brand)' }}>Email Reply Generator</span></h1>
          <p style={{ color:'var(--text-secondary)', marginTop:8, maxWidth:480, marginLeft:'auto', marginRight:'auto' }}>Describe any email situation and get a professional reply in seconds. No login required.</p>
        </div>

        <div className="container">
          <div className="er-grid">
            <div className="er-card">
              <h3>📧 Describe Your Situation</h3>
              <form onSubmit={handleGenerate}>
                <div className="er-form-group">
                  <label>What email do you need to reply to?</label>
                  <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="e.g. A client emailed asking why the project is delayed. I need to explain the delay professionally and offer a new timeline." rows={4} />
                </div>
                <div className="er-form-group">
                  <label>Tone</label>
                  <select value={tone} onChange={e => setTone(e.target.value)}>
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Apologetic</option>
                    <option>Short & Direct</option>
                  </select>
                </div>
                <button type="submit" className="er-btn" disabled={loading}>
                  {loading ? '⏳ Generating...' : '✨ Generate Reply'}
                </button>
              </form>
            </div>

            <div className="er-card" style={{ minHeight:280 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h3 style={{ fontSize:'1rem', fontWeight:700, margin:0 }}>✉️ Your Reply</h3>
                {reply && !loading && (
                  <button onClick={handleCopy} style={{ background:'none', border:'1px solid var(--border)', padding:'6px 16px', borderRadius:8, fontWeight:600, fontSize:'.82rem', cursor:'pointer' }}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                )}
              </div>
              {error && <div className="er-error">{error}</div>}
              {!reply && !loading && !error && <div className="er-empty"><div><div style={{fontSize:'2.5rem',marginBottom:8}}>✉️</div><div>Describe your situation and click Generate</div></div></div>}
              {loading && <div className="er-empty"><div><div style={{fontSize:'2rem',marginBottom:8}}>⏳</div><div>Writing...</div></div></div>}
              {reply && !loading && (
                <>
                  <div className="er-reply">{reply}</div>
                  <div className="er-upgrade">
                    <h4>🚀 Automate all your email replies?</h4>
                    <p>Taskmatic Pro includes a full email follow-up sequence generator. 1-month free trial.</p>
                    <a href="/register">Try Taskmatic Free →</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'24px 0' }}>
          <div className="container" style={{ display:'flex', justifyContent:'center', gap:20 }}>
            <a href="/free/social-post" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.8rem' }}>Social Post Generator</a>
            <a href="/free/thankyou-email" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.8rem' }}>Thank-You Email</a>
            <a href="/free/email-reply" style={{ color:'var(--brand)', textDecoration:'none', fontSize:'.8rem', fontWeight:600 }}>Email Reply</a>
          </div>
        </footer>
      </div>
    </>
  );
}
