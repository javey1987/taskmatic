// app/free/research/page.tsx — Free Market Research Tool
'use client';

import { useState } from 'react';

export default function FreeResearchPage() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(''); setReport('');
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), industry: industry.trim() }),
      });
      const data = await res.json();
      if (data.report) setReport(data.report);
      else setError('Failed to generate report');
    } catch { setError('Network error'); }
    finally { setLoading(false); }
  };

  const renderReport = (text: string) => text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{fontSize:'1.1rem',fontWeight:700,marginTop:20,marginBottom:6}}>{line.replace('## ','')}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} style={{fontSize:'1rem',fontWeight:600,marginTop:16,marginBottom:4}}>{line.replace('### ','')}</h3>;
    if (line.startsWith('- **')) return <p key={i} style={{marginLeft:12,marginBottom:4,fontSize:'0.9rem',lineHeight:1.6}}>{line}</p>;
    if (line.startsWith('- ')) return <li key={i} style={{marginLeft:16,marginBottom:3,fontSize:'0.9rem'}}>{line.replace('- ','')}</li>;
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} style={{marginBottom:4,fontSize:'0.9rem',lineHeight:1.6}}>{line}</p>;
  });

  return (
    <>
      <style>{`
        .fr-page { min-height:100vh; background:var(--bg-base); }
        .fr-grid { display:grid; grid-template-columns:1fr 1.3fr; gap:32px; align-items:start; padding-bottom:80px; }
        .fr-card { background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px; }
        .fr-card h3 { font-size:1rem; font-weight:700; margin-bottom:16px; }
        .fr-form-group { margin-bottom:14px; }
        .fr-form-group label { display:block; font-weight:600; font-size:.85rem; margin-bottom:4px; }
        .fr-form-group textarea, .fr-form-group input { width:100%; padding:10px 14px; border:1px solid var(--border); border-radius:10px; font-size:.92rem; outline:none; background:var(--bg-base); font-family:inherit; }
        .fr-form-group textarea:focus, .fr-form-group input:focus { border-color:var(--brand); }
        .fr-form-group textarea { resize:vertical; min-height:70px; }
        .fr-btn { width:100%; padding:14px; border:none; border-radius:12px; background:var(--brand); color:#fff; font-weight:700; font-size:1rem; cursor:pointer; }
        .fr-btn:hover:not(:disabled) { transform:translateY(-2px); }
        .fr-btn:disabled { opacity:.6; }
        .fr-report { font-size:.92rem; line-height:1.7; }
        .fr-empty { display:flex; align-items:center; justify-content:center; min-height:250px; color:var(--text-muted); text-align:center; }
        .fr-error { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; padding:12px 16px; border-radius:10px; margin-bottom:16px; font-size:.88rem; }
        .fr-badge { display:inline-block; background:#dcfce7; color:#166534; font-size:.75rem; font-weight:700; padding:4px 14px; border-radius:20px; margin-bottom:16px; }
        .fr-note { font-size:.78rem; color:var(--text-muted); margin-top:6px; }
        .fr-upgrade { background:linear-gradient(135deg,var(--brand),oklch(48% .22 270)); text-align:center; padding:28px 20px; border-radius:14px; margin-top:20px; }
        .fr-upgrade h4 { color:#fff; font-size:1rem; font-weight:800; margin-bottom:4px; }
        .fr-upgrade a { display:inline-block; background:#fff; color:var(--brand); padding:10px 28px; border-radius:10px; font-weight:700; font-size:.85rem; text-decoration:none; margin-top:10px; }
        @media (max-width:800px) { .fr-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="fr-page">
        <div className="container">
          <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 0',borderBottom:'1px solid var(--border)'}}>
            <a href="/" style={{fontWeight:700,fontSize:'1.2rem',textDecoration:'none',color:'var(--text-primary)'}}>Task<span style={{color:'var(--brand)'}}>matic</span></a>
            <div style={{display:'flex',gap:12}}>
              <a href="/free/social-post" style={{color:'var(--text-secondary)',fontSize:'.82rem',textDecoration:'none'}}>Social Post</a>
              <a href="/register" style={{background:'var(--brand)',color:'#fff',padding:'8px 20px',borderRadius:8,fontWeight:600,fontSize:'.85rem',textDecoration:'none'}}>Sign Up</a>
            </div>
          </nav>
        </div>

        <div className="container" style={{textAlign:'center',padding:'40px 0 24px'}}>
          <div className="fr-badge">✨ Free tool — limited to 5 searches/day</div>
          <h1 style={{fontSize:'clamp(1.5rem,3.5vw,2.2rem)',fontWeight:800}}>Free AI <span style={{color:'var(--brand)'}}>Market Research</span></h1>
          <p style={{color:'var(--text-secondary)',marginTop:8,maxWidth:480,marginLeft:'auto',marginRight:'auto'}}>Search GitHub, Reddit, and the web — AI synthesizes findings into a structured report.</p>
        </div>

        <div className="container">
          <div className="fr-grid">
            <div className="fr-card">
              <h3>🔍 What do you want to research?</h3>
              <form onSubmit={handleResearch}>
                <div className="fr-form-group">
                  <label>Research Query</label>
                  <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. AI automation tools for freelancers, trends in no-code SaaS, competitors in social media scheduling" rows={3} />
                </div>
                <div className="fr-form-group">
                  <label>Industry (optional)</label>
                  <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. SaaS, freelancing, e-commerce" />
                </div>
                <button type="submit" className="fr-btn" disabled={loading}>
                  {loading ? '⏳ Researching...' : '🔍 Generate Report'}
                </button>
                <div className="fr-note">Searches GitHub, Reddit & web. AI-synthesized report.</div>
              </form>
            </div>

            <div className="fr-card" style={{minHeight:300}}>
              <h3 style={{margin:0,marginBottom:16}}>📊 Research Report</h3>
              {error && <div className="fr-error">{error}</div>}
              {!report && !loading && !error && (
                <div className="fr-empty"><div><div style={{fontSize:'2.5rem',marginBottom:8}}>🔍</div><div>Enter a query and generate a report</div></div></div>
              )}
              {loading && <div className="fr-empty"><div><div style={{fontSize:'2rem',marginBottom:8}}>⏳</div><div>Searching the web and analyzing...</div></div></div>}
              {report && !loading && (
                <>
                  <div className="fr-report">{renderReport(report)}</div>
                  <div className="fr-upgrade">
                    <h4>🚀 Need in-depth research?</h4>
                    <p>Taskmatic Pro has a dedicated Market Research template with unlimited reports.</p>
                    <a href="/register">Try Taskmatic Free →</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
