// app/free/social-post/page.tsx — Free Social Post Generator (no login required)
'use client';

import { useState, useCallback } from 'react';

export default function FreeSocialPostPage() {
  const [business, setBusiness] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Warm & Friendly');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business.trim() || business.trim().length < 10) {
      setError('Please describe your business (at least 10 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setPost('');

    try {
      const params = new URLSearchParams({
        business: business.trim(),
        audience: audience.trim() || 'General audience',
        tone,
      });

      const res = await fetch(`/api/free/social-post?${params}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError('🚫 Free limit reached! You can use this tool 3 times per hour. Sign up for unlimited access.');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setPost(data.post);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [business, audience, tone]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(post);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = post;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [post]);

  return (
    <>
      {/* PAGE STYLES — scoped to this component */}
      <style>{`
        .fsp-page { min-height: 100vh; background: var(--bg-base); }
        .fsp-nav { border-bottom: 1px solid var(--border); padding: 20px 0; }
        .fsp-hero { text-align: center; padding: 48px 0 32px; }
        .fsp-hero h1 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; letter-spacing: -0.5px; }
        .fsp-hero h1 span { color: var(--brand); }
        .fsp-hero p { color: var(--text-secondary); max-width: 480px; margin: 8px auto 0; }
        .fsp-free-badge { display: inline-block; background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-bottom: 16px; }
        .fsp-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: start; padding-bottom: 80px; }
        .fsp-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
        .fsp-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
        .fsp-form-group { margin-bottom: 16px; }
        .fsp-form-group label { display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 6px; }
        .fsp-form-group textarea, .fsp-form-group input, .fsp-form-group select {
          width: 100%; padding: 11px 14px; border: 1px solid var(--border); border-radius: 10px;
          font-size: 0.92rem; font-family: inherit; outline: none; background: var(--bg-base);
          transition: border-color .2s;
        }
        .fsp-form-group textarea:focus, .fsp-form-group input:focus, .fsp-form-group select:focus { border-color: var(--brand); }
        .fsp-form-group textarea { resize: vertical; min-height: 80px; }
        .fsp-form-group .hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; }
        .fsp-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; background: var(--brand); color: #fff; font-weight: 700; font-size: 1rem; cursor: pointer; transition: transform .15s, box-shadow .15s; }
        .fsp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px oklch(54% 0.19 265 / 0.35); }
        .fsp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .fsp-result { min-height: 200px; display: flex; flex-direction: column; }
        .fsp-result-empty { display: flex; align-items: center; justify-content: center; min-height: 200px; color: var(--text-muted); text-align: center; font-size: 0.9rem; line-height: 1.6; }
        .fsp-post { white-space: pre-wrap; line-height: 1.7; font-size: 0.92rem; padding: 0 0 16px 0; }
        .fsp-post-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .fsp-post-header .label { font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px; }
        .fsp-copy-btn { background: none; border: 1px solid var(--border); padding: 6px 16px; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; color: var(--text-secondary); transition: all .15s; }
        .fsp-copy-btn:hover { border-color: var(--brand); color: var(--brand); }
        .fsp-copy-btn.copied { border-color: var(--accent); color: var(--accent); }
        .fsp-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 0.88rem; }
        .fsp-upgrade { background: linear-gradient(135deg, var(--brand), oklch(48% 0.22 270)); text-align: center; padding: 40px 24px; border-radius: 14px; margin-top: auto; }
        .fsp-upgrade h4 { color: #fff; font-size: 1.05rem; font-weight: 800; margin-bottom: 4px; }
        .fsp-upgrade p { color: oklch(85% 0.03 260 / 0.9); font-size: 0.85rem; margin-bottom: 16px; }
        .fsp-upgrade a { display: inline-block; background: #fff; color: var(--brand); padding: 10px 28px; border-radius: 10px; font-weight: 700; font-size: 0.88rem; text-decoration: none; transition: transform .15s; }
        .fsp-upgrade a:hover { transform: translateY(-2px); }
        .fsp-spinner { display: inline-block; width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: fsp-spin 0.6s linear infinite; vertical-align: middle; margin-right: 6px; }
        @keyframes fsp-spin { to { transform: rotate(360deg); } }
        @media (max-width: 800px) { .fsp-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="fsp-page">
        {/* NAV */}
        <div className="container">
          <nav className="fsp-nav" style={{ borderBottom: '1px solid var(--border)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" className="logo" style={{ fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none', color: 'var(--text-primary)' }}>Task<span style={{ color: 'var(--brand)' }}>matic</span></a>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <a href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Log In</a>
              <a href="/register" style={{ background: 'var(--brand)', color: '#fff', textDecoration: 'none', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem' }}>Sign Up Free</a>
            </div>
          </nav>
        </div>

        {/* HERO */}
        <div className="container">
          <div className="fsp-hero">
            <div className="fsp-free-badge">✨ Free tool — no sign-up needed</div>
            <h1>Free AI <span>Social Post Generator</span></h1>
            <p>Describe your business and get a ready-to-post Twitter/X post in seconds. &mdash; No login. No credit card.</p>
          </div>
        </div>

        {/* TOOL */}
        <div className="container">
          <div className="fsp-grid">
            <div className="fsp-card">
              <h3>📝 Describe Your Business</h3>
              <form onSubmit={handleGenerate}>
                <div className="fsp-form-group">
                  <label htmlFor="business">What does your business do?</label>
                  <textarea id="business" value={business} onChange={e => setBusiness(e.target.value)} placeholder="e.g. I run a design studio that helps SaaS startups polish their UI. We do redesigns, design systems, and landing page optimization." rows={4} />
                  <div className="hint">Be specific — better descriptions = better posts</div>
                </div>

                <div className="fsp-form-group">
                  <label htmlFor="audience">Who are you targeting? <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <input id="audience" type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. SaaS founders, startup CTOs, product managers" />
                </div>

                <div className="fsp-form-group">
                  <label htmlFor="tone">Tone</label>
                  <select id="tone" value={tone} onChange={e => setTone(e.target.value)}>
                    <option value="Professional">Professional</option>
                    <option value="Warm & Friendly">Warm & Friendly</option>
                    <option value="Funny">Funny</option>
                    <option value="Inspiring">Inspiring</option>
                    <option value="Bold">Bold</option>
                  </select>
                </div>

                <button type="submit" className="fsp-btn" disabled={loading}>
                  {loading ? <><span className="fsp-spinner"></span> Generating...</> : '✨ Generate Post'}
                </button>
              </form>
            </div>

            <div className="fsp-card fsp-result">
              <h3>🐦 Your Twitter Post</h3>

              {error && <div className="fsp-error">{error}</div>}

              {!post && !loading && !error && (
                <div className="fsp-result-empty">
                  <div>
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📝</div>
                    <div>Fill in the form and click Generate</div>
                    <div style={{ fontSize: '0.8rem', marginTop: 4 }}>You'll get a ready-to-post Twitter/X post in seconds</div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="fsp-result-empty">
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>⏳</div>
                    <div>AI is writing...</div>
                    <div style={{ fontSize: '0.8rem', marginTop: 4, color: 'var(--text-muted)' }}>This usually takes 1-3 seconds</div>
                  </div>
                </div>
              )}

              {post && !loading && (
                <>
                  <div className="fsp-post-header">
                    <span className="label">🐦 Twitter / X</span>
                    <button className={`fsp-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                      {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <div className="fsp-post">{post}</div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8 }}>
                    <div className="fsp-upgrade">
                      <h4>🚀 Want LinkedIn, Reddit & Newsletter too?</h4>
                      <p>Get posts for all 4 platforms with one click. 1-month free trial.</p>
                      <a href="/register">Try Taskmatic Free →</a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0 20px' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Task<span style={{ color: 'var(--brand)' }}>matic</span></div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="/taskmatic-terms.html" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem' }}>Terms</a>
              <a href="/taskmatic-privacy.html" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem' }}>Privacy</a>
              <a href="/taskmatic-refund.html" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem' }}>Refund</a>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>© 2026 Taskmatic</div>
          </div>
        </footer>
      </div>
    </>
  );
}
