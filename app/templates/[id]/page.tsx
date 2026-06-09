'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  prompt: string;
  fields: FieldDef[];
}

interface FieldDef {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  default?: string;
}

// Templates that support Human-in-the-loop (review & approve before finalizing)
const HITL_SLUGS = ['cold-email', 'invoice-generator'];

export default function TemplatePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.id as string;
  const { data: session, status } = useSession();

  const [template, setTemplate] = useState<Template | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Human-in-the-loop state
  const [phase, setPhase] = useState<'input' | 'review' | 'final'>('input');
  const [editMode, setEditMode] = useState(false);
  const [editableOutput, setEditableOutput] = useState('');

  const hasHitl = HITL_SLUGS.includes(slug);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    fetch('/api/templates')
      .then(r => r.json())
      .then((ts: any[]) => {
        const t = ts.find((t: any) => t.slug === slug);
        if (t) {
          t.fields = typeof t.fields === 'string' ? JSON.parse(t.fields) : t.fields;
          setTemplate(t);
          const defaults: Record<string, string> = {};
          t.fields.forEach((f: FieldDef) => {
            if (f.default) defaults[f.key] = f.default;
          });
          setInputs(defaults);
        }
      })
      .catch(console.error);
  }, [slug]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateSlug: slug, inputs }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Generation failed');
      } else {
        setOutput(data.output);
        if (hasHitl) {
          setPhase('review');
          setEditableOutput(data.output);
        } else {
          setPhase('final');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleApprove() {
    setPhase('final');
  }

  function handleRegenerate() {
    setPhase('input');
    setOutput('');
    setEditMode(false);
  }

  if (status === 'loading' || !template) {
    return <div className="page-loading">Loading template...</div>;
  }

  return (
    <div className="template-page">
      <nav className="t-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" className="logo" style={{ fontSize: '1.1rem' }}>Task<span>matic</span></a>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/templates" style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>All Templates</a>
            <a href="/dashboard" style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>Dashboard</a>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Phase indicator */}
        {hasHitl && (
          <div className="phase-bar">
            <div className={`phase-step ${phase === 'input' ? 'active' : 'done'}`}>
              <span className="phase-num">{phase === 'final' ? '✅' : '1'}</span>
              <span>Generate</span>
            </div>
            <div className={`phase-line ${phase !== 'input' ? 'active' : ''}`} />
            <div className={`phase-step ${phase === 'review' ? 'active' : ''} ${phase === 'final' ? 'done' : ''}`}>
              <span className="phase-num">{phase === 'final' ? '✅' : '2'}</span>
              <span>Review & Approve</span>
            </div>
            <div className={`phase-line ${phase === 'final' ? 'active' : ''}`} />
            <div className={`phase-step ${phase === 'final' ? 'active' : ''}`}>
              <span className="phase-num">{phase === 'final' ? '✅' : '3'}</span>
              <span>Final</span>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: '2.5rem' }}>{template.icon}</span>
          <h1 style={{ margin: '8px 0 4px' }}>{template.name}</h1>
          <p style={{ color: 'var(--text2)' }}>{template.description}</p>
        </div>

        <div className="t-layout">
          {/* LEFT: Input form - only visible in input phase */}
          {(phase === 'input' || !hasHitl) && (
            <div className="t-form">
              <h3 style={{ marginBottom: 20 }}>Fill in the details</h3>
              <form onSubmit={handleGenerate}>
                {template.fields.map(f => (
                  <div className="form-group" key={f.key}>
                    <label>{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={inputs[f.key] || ''}
                        onChange={e => setInputs({ ...inputs, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        rows={5}
                        required
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={inputs[f.key] || ''}
                        onChange={e => setInputs({ ...inputs, [f.key]: e.target.value })}
                      >
                        {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={inputs[f.key] || ''}
                        onChange={e => setInputs({ ...inputs, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        required
                      />
                    )}
                  </div>
                ))}
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? '⏳ Generating...' : '✨ Generate'}
                </button>
              </form>
            </div>
          )}

          {/* RIGHT: Result area */}
          <div className="t-result">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ margin:0 }}>
                {phase === 'review' ? '🔍 Review & Approve' :
                 phase === 'final' ? '✅ Final Output' : 'Result'}
              </h3>
              {output && !loading && phase === 'final' && (
                <button className="btn-edit-toggle" onClick={() => { setEditMode(!editMode); if (!editMode) setEditableOutput(output); }}>
                  {editMode ? '👁️ Preview' : '✏️ Edit Output'}
                </button>
              )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {/* Human-in-the-loop: Review step */}
            {phase === 'review' && output && (
              <div>
                {/* HITL Banner */}
                <div className="hitl-banner">
                  <span className="hitl-icon">👤</span>
                  <div>
                    <strong>Human Review Required</strong>
                    <p>AI has generated a draft. Review, edit, then approve before finalizing.</p>
                  </div>
                </div>

                {/* Editable preview */}
                <textarea
                  value={editableOutput}
                  onChange={e => setEditableOutput(e.target.value)}
                  className="edit-textarea"
                  rows={18}
                />

                <div style={{ display:'flex', gap:8, marginTop:16 }}>
                  <button className="btn-primary hitl-approve" onClick={handleApprove} style={{ flex:2 }}>
                    ✅ Approve & Confirm
                  </button>
                  <button className="btn-secondary" onClick={handleRegenerate} style={{ flex:1 }}>
                    ↩️ Start Over
                  </button>
                </div>
                <p className="hitl-note">You can edit the text above before approving. Once approved, the output is finalized.</p>
              </div>
            )}

            {/* Edit mode (final phase) */}
            {editMode && phase === 'final' && output ? (
              <div>
                <textarea
                  value={editableOutput}
                  onChange={e => setEditableOutput(e.target.value)}
                  className="edit-textarea"
                  rows={15}
                />
                <div style={{ display:'flex', gap:8, marginTop:12 }}>
                  <button className="btn-primary" style={{ flex:1 }} onClick={() => { navigator.clipboard.writeText(editableOutput); alert('Copied!'); }}>
                    📋 Copy Edited
                  </button>
                  <button className="btn-secondary" onClick={() => { setEditableOutput(output); setEditMode(false); }}>
                    ↩️ Reset
                  </button>
                </div>
              </div>
            ) : phase === 'final' && output ? (
              <div className="output-content">
                {output.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h3 key={i} style={{ marginTop: 16 }}>{line.replace('## ', '')}</h3>;
                  if (line.startsWith('### ')) return <h4 key={i} style={{ marginTop: 12 }}>{line.replace('### ', '')}</h4>;
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, marginTop: 8 }}>{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 16, marginBottom: 4 }}>{line.replace('- ', '')}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} style={{ marginBottom: 4 }}>{line}</p>;
                })}

                {/* Finalized badge */}
                {hasHitl && (
                  <div className="finalized-badge">
                    ✅ Human-approved
                  </div>
                )}

                <button className="btn-secondary" style={{ marginTop: 20 }} onClick={() => { navigator.clipboard.writeText(output); alert('Copied to clipboard!'); }}>
                  📋 Copy Result
                </button>

                {hasHitl && (
                  <button className="btn-link" style={{ marginTop: 12, display:'block' }} onClick={handleRegenerate}>
                    ← Regenerate from scratch
                  </button>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <p style={{ color: 'var(--text2)' }}>Fill in the form and click Generate to see AI-generated results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .template-page { min-height: 100vh; background: var(--bg); }
        .page-loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; color: var(--text2); }
        .t-nav { border-bottom: 1px solid var(--border); padding: 14px 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); }
        .t-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 32px; align-items: start; }
        @media (max-width:800px) { .t-layout { grid-template-columns: 1fr; } }
        .t-form, .t-result { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
        .t-result { min-height: 300px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.9rem; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; font-size: 1rem; outline: none; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--brand); }
        .form-group textarea { resize: vertical; }
        .output-content { line-height: 1.7; font-size: 0.95rem; }
        .empty-state { display: flex; align-items: center; justify-content: center; min-height: 200px; }
        .alert { padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 0.9rem; }
        .alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .edit-textarea { width: 100%; min-height: 300px; padding: 16px; border: 1px solid var(--border); border-radius: 10px; font-size: 0.9rem; font-family: 'IBM Plex Mono', monospace; line-height: 1.6; resize: vertical; outline: none; }
        .edit-textarea:focus { border-color: var(--brand); }
        .btn-edit-toggle { background: none; border: 1px solid var(--border); padding: 6px 14px; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; color: var(--text-secondary); transition: all .15s; }
        .btn-edit-toggle:hover { border-color: var(--brand); color: var(--brand); }

        /* Human-in-the-loop Styles */
        .phase-bar { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 32px; padding: 16px 24px; background: #fff; border: 1px solid var(--border); border-radius: 12px; }
        .phase-step { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
        .phase-step.active { color: var(--brand); }
        .phase-step.done { color: #16a34a; }
        .phase-num { width: 26px; height: 26px; border-radius: 50%; background: var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        .phase-step.active .phase-num { background: var(--brand); color: #fff; }
        .phase-step.done .phase-num { background: #16a34a; color: #fff; }
        .phase-line { width: 40px; height: 2px; background: var(--border); margin: 0 8px; }
        .phase-line.active { background: #16a34a; }
        .hitl-banner { display: flex; align-items: flex-start; gap: 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; }
        .hitl-icon { font-size: 1.3rem; line-height: 1; }
        .hitl-banner strong { font-size: 0.9rem; }
        .hitl-banner p { margin: 4px 0 0; font-size: 0.82rem; color: #92400e; }
        .hitl-approve { background: #16a34a !important; }
        .hitl-approve:hover { background: #15803d !important; }
        .hitl-note { font-size: 0.78rem; color: var(--text-muted); margin-top: 8px; text-align: center; }
        .finalized-badge { display: inline-block; background: #dcfce7; color: #166534; font-size: 0.8rem; font-weight: 600; padding: 4px 12px; border-radius: 8px; margin-top: 12px; }
        .btn-link { background: none; border: none; color: var(--text-muted); text-decoration: underline; font-size: 0.82rem; cursor: pointer; padding: 0; }
        .btn-link:hover { color: var(--brand); }
      `}</style>
    </div>
  );
}
