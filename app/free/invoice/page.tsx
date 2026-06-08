// app/free/invoice/page.tsx — Free Invoice Generator
'use client';

import { useState } from 'react';

export default function FreeInvoicePage() {
  const [form, setForm] = useState({ clientName: '', yourName: '', services: '', invoiceNumber: '', paymentTerms: 'Net 15' });
  const [invoice, setInvoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.services) { setError('Client name and services required.'); return; }
    setLoading(true); setError(''); setInvoice('');
    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`/api/free/invoice?${params}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setInvoice(data.invoice);
    } catch { setError('Network error.'); } finally { setLoading(false); }
  };

  return (
    <main style={{ minHeight:'100vh', background:'var(--bg-base)', padding:'24px' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <a href="/" style={{ fontWeight:700, fontSize:'1.1rem', textDecoration:'none', color:'var(--text-primary)' }}>Task<span style={{ color:'var(--brand)' }}>matic</span></a>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:24, marginTop:24, alignItems:'start' }}>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24 }}>
            <div style={{ display:'inline-block', background:'#dcfce7', color:'#166534', fontSize:'.75rem', fontWeight:700, padding:'4px 14px', borderRadius:20, marginBottom:12 }}>✨ Free Tool</div>
            <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:16 }}>Free Invoice Generator</h2>
            <form onSubmit={handleGenerate}>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block', fontWeight:600, fontSize:'.82rem', marginBottom:4 }}>Client Name</label>
                <input value={form.clientName} onChange={e => update('clientName', e.target.value)} placeholder="Acme Corp" style={{ width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:10, fontSize:'.9rem', outline:'none' }} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block', fontWeight:600, fontSize:'.82rem', marginBottom:4 }}>Your Business Name</label>
                <input value={form.yourName} onChange={e => update('yourName', e.target.value)} placeholder="Jane Doe Design" style={{ width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:10, fontSize:'.9rem', outline:'none' }} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block', fontWeight:600, fontSize:'.82rem', marginBottom:4 }}>Services (one per line, include $ amounts)</label>
                <textarea value={form.services} onChange={e => update('services', e.target.value)} placeholder="Logo design ($500)&#10;Website redesign ($2,000)" rows={4} style={{ width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:10, fontSize:'.9rem', outline:'none', resize:'vertical', fontFamily:'inherit' }} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'.82rem', marginBottom:4 }}>Invoice #</label>
                  <input value={form.invoiceNumber} onChange={e => update('invoiceNumber', e.target.value)} placeholder="INV-001" style={{ width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:10, fontSize:'.9rem', outline:'none' }} />
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'.82rem', marginBottom:4 }}>Payment Terms</label>
                  <select value={form.paymentTerms} onChange={e => update('paymentTerms', e.target.value)} style={{ width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:10, fontSize:'.9rem', outline:'none', background:'white' }}>
                    <option>Due on receipt</option><option>Net 7</option><option>Net 15</option><option>Net 30</option><option>Net 60</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ width:'100%', padding:14, border:'none', borderRadius:12, background:'var(--brand)', color:'#fff', fontWeight:700, fontSize:'1rem', cursor:'pointer' }}>
                {loading ? '⏳ Generating...' : '📄 Generate Invoice'}
              </button>
            </form>
          </div>

          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24, minHeight:350 }}>
            <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:12 }}>📄 Invoice</h3>
            {error && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:12, borderRadius:10, marginBottom:12, fontSize:'.88rem' }}>{error}</div>}
            {!invoice && !loading && !error && <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:250, color:'var(--text-muted)', textAlign:'center' }}><div><div style={{ fontSize:'2.5rem', marginBottom:8 }}>📄</div><div>Fill in the form and generate</div></div></div>}
            {loading && <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:250 }}>⏳ Generating...</div>}
            {invoice && !loading && (
              <>
                <div style={{ whiteSpace:'pre-wrap', lineHeight:1.6, fontSize:'.85rem', background:'var(--bg-base)', padding:16, borderRadius:10 }}>{invoice}</div>
                <button onClick={() => { navigator.clipboard.writeText(invoice); }} style={{ marginTop:12, background:'none', border:'1px solid var(--border)', padding:'8px 20px', borderRadius:8, fontWeight:600, cursor:'pointer', width:'100%' }}>📋 Copy Invoice</button>
                <div style={{ marginTop:16, background:'linear-gradient(135deg,var(--brand),oklch(48% .22 270))', textAlign:'center', padding:'24px 16px', borderRadius:14 }}>
                  <h4 style={{ color:'#fff', fontSize:'.95rem', margin:0, marginBottom:4 }}>🚀 Need recurring invoices?</h4>
                  <p style={{ color:'oklch(85% .03 260/.9)', fontSize:'.8rem', marginBottom:10 }}>Taskmatic Pro has a dedicated Invoice Generator template with history tracking.</p>
                  <a href="/register" style={{ display:'inline-block', background:'#fff', color:'var(--brand)', padding:'8px 24px', borderRadius:10, fontWeight:700, fontSize:'.82rem', textDecoration:'none' }}>Try Free →</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
