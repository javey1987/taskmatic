// app/free/thankyou-email/page.tsx — Free Thank-You Email Generator
'use client';

import { useState, useCallback } from 'react';

export default function FreeThankYouPage() {
  const [form, setForm] = useState({ clientName: '', service: '', userName: '', tone: 'Warm & Friendly' });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.service) {
      setError('Please fill in at least Client Name and Service.');
      return;
    }
    setLoading(true);
    setError('');
    setEmail('');

    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`/api/free/thankyou-email?${params}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed'); return; }
      setEmail(data.email);
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  }, [form]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <>
      <style>{`
        .fte-page { min-height: 100vh; background: var(--bg-base); }
        .fte-hero { text-align: center; padding: 48px 0 32px; }
        .fte-hero h1 { font-size: clamp(1.5rem, 3.5vw, 2.2rem); font-weight: 800; }
        .fte-hero h1 span { color: var(--brand); }
        .fte-badge { display:inline-block; background:#dcfce7; color:#166534; font-size:.75rem; font-weight:700; padding:4px 14px; border-radius:20px; margin-bottom:16px; }
        .fte-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:32px; align-items:start; padding-bottom:80px; }
        .fte-card { background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px; }
        .fte-form-group { margin-bottom:14px; }
        .fte-form-group label { display:block; font-weight:600; font-size:.85rem; margin-bottom:4px; }
        .fte-form-group input, .fte-form-group select { width:100%; padding:10px 14px; border:1px solid var(--border); border-radius:10px; font-size:.92rem; outline:none; background:var(--bg-base); }
        .fte-form-group input:focus, .fte-form-group select:focus { border-color:var(--brand); }
        .fte-btn { width:100%; padding:14px; border:none; border-radius:12px; background:var(--brand); color:#fff; font-weight:700; font-size:1rem; cursor:pointer; transition:transform .15s; }
        .fte-btn:hover:not(:disabled) { transform:translateY(-2px); }
        .fte-btn:disabled { opacity:.6; cursor:not-allowed; }
        .fte-spinner { display:inline-block; width:18px; height:18px; border:2px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:fte-spin .6s linear infinite; vertical-align:middle; margin-right:6px; }
        @keyframes fte-spin { to { transform:rotate(360deg); } }
        .fte-email { white-space:pre-wrap; line-height:1.7; font-size:.92rem; padding:16px; background:var(--bg-base); border-radius:10px; }
        .fte-result-empty { display:flex; align-items:center; justify-content:center; min-height:200px; color:var(--text-muted); text-align:center; }
        .fte-error { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; padding:12px 16px; border-radius:10px; margin-bottom:16px; font-size:.88rem; }
        .fte-upgrade { background:linear-gradient(135deg,var(--brand),oklch(48% .22 270)); text-align:center; padding:32px 20px; border-radius:14px; margin-top:16px; }
        .fte-upgrade h4 { color:#fff; font-size:1rem; font-weight:800; margin-bottom:4px; }
        .fte-upgrade p { color:oklch(85% .03 260/.9); font-size:.82rem; margin-bottom:12px; }
        .fte-upgrade a { display:inline-block; background:#fff; color:var(--brand); padding:10px 28px; border-radius:10px; font-weight:700; font-size:.85rem; text-decoration:none; }
        .fte-upgrade a:hover { transform:translateY(-2px); }
        .fte-copy-btn { background:none; border:1px solid var(--border); padding:6px 16px; border-radius:8px; font-weight:600; font-size:.82rem; cursor:pointer; transition:all .15s; }
        .fte-copy-btn:hover { border-color:var(--brand); color:var(--brand); }
        @media (max-width:800px) { .fte-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="fte-page">
        <div className="container">
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'1px solid var(--border)' }}>
            <a href="/" style={{ fontWeight:700, fontSize:'1.2rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <a href="/free/social-post" style={{ color:'var(--text-secondary)', fontSize:'.85rem', textDecoration:'none' }}>Social Post Tool</a>
              <a href="/register" style={{ background:'var(--brand)', color:'#fff', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:'.85rem', textDecoration:'none' }}>Sign Up Free</a>
            </div>
          </nav>
        </div>

        <div className="container">
          <div className="fte-hero">
            <div className="fte-badge">✨ Free tool — no sign-up needed</div>
            <h1>Free AI <span>Thank-You Email Generator</span></h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Generate a professional thank-you email for your clients in seconds. No login required.</p>
          </div>
        </div>

        <div className="container">
          <div className="fte-grid">
            <div className="fte-card">
              <h3 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 700 }}>📝 Client Details</h3>
              <form onSubmit={handleGenerate}>
                <div className="fte-form-group">
                  <label>Client Name</label>
                  <input value={form.clientName} onChange={e => update('clientName', e.target.value)} placeholder="e.g. Sarah Johnson" />
                </div>
                <div className="fte-form-group">
                  <label>Service Provided</label>
                  <input value={form.service} onChange={e => update('service', e.target.value)} placeholder="e.g. Website redesign consultation" />
                </div>
                <div className="fte-form-group">
                  <label>Your Name</label>
                  <input value={form.userName} onChange={e => update('userName', e.target.value)} placeholder="e.g. Alex" />
                </div>
                <div className="fte-form-group">
                  <label>Tone</label>
                  <select value={form.tone} onChange={e => update('tone', e.target.value)}>
                    <option>Warm & Friendly</option>
                    <option>Professional</option>
                    <option>Short & Sweet</option>
                  </select>
                </div>
                <button type="submit" className="fte-btn" disabled={loading}>
                  {loading ? <><span className="fte-spinner"></span> Generating...</> : '✨ Generate Email'}
                </button>
              </form>
            </div>

            <div className="fte-card" style={{ minHeight: 300 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h3 style={{ fontSize:'1rem', fontWeight:700 }}>✉️ Your Email</h3>
                {email && !loading && (
                  <button className="fte-copy-btn" onClick={handleCopy}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                )}
              </div>

              {error && <div className="fte-error">{error}</div>}

              {!email && !loading && !error && (
                <div className="fte-result-empty">
                  <div>
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>✉️</div>
                    <div>Fill in the form and click Generate</div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="fte-result-empty"><div><div style={{fontSize:'2rem',marginBottom:8}}>⏳</div><div>Generating...</div></div></div>
              )}

              {email && !loading && (
                <>
                  <div className="fte-email">{email}</div>
                  <div className="fte-upgrade">
                    <h4>🚀 Want the full 3-email follow-up sequence?</h4>
                    <p>Taskmatic Pro generates thank-you + check-in + review request emails automatically.</p>
                    <a href="/register">Try Taskmatic Free →</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <footer style={{ borderTop:'1px solid var(--border)', padding:'32px 0 20px' }}>
          <div className="container" style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontWeight:700 }}>Task<span style={{ color:'var(--brand)' }}>matic</span></div>
            <div style={{ display:'flex', gap:20 }}>
              <a href="/waitlist" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Join Waitlist</a>
              <a href="/free/social-post" style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:'.82rem' }}>Social Post Tool</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
