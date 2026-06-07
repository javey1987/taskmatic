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
          // Set defaults
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
    setOutput('');

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
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <a href="/dashboard" style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>Dashboard</a>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: '2.5rem' }}>{template.icon}</span>
          <h1 style={{ margin: '8px 0 4px' }}>{template.name}</h1>
          <p style={{ color: 'var(--text2)' }}>{template.description}</p>
        </div>

        <div className="t-layout">
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

          <div className="t-result">
            <h3 style={{ marginBottom: 20 }}>Result</h3>
            {error && <div className="alert alert-error">{error}</div>}
            {output ? (
              <div className="output-content">
                {output.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h3 key={i} style={{ marginTop: 16 }}>{line.replace('## ', '')}</h3>;
                  if (line.startsWith('### ')) return <h4 key={i} style={{ marginTop: 12 }}>{line.replace('### ', '')}</h4>;
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, marginTop: 8 }}>{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 16, marginBottom: 4 }}>{line.replace('- ', '')}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} style={{ marginBottom: 4 }}>{line}</p>;
                })}
                <button className="btn-secondary" style={{ marginTop: 20 }} onClick={() => { navigator.clipboard.writeText(output); alert('Copied to clipboard!'); }}>
                  📋 Copy Result
                </button>
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
        @media (max-width: 800px) { .t-layout { grid-template-columns: 1fr; } }
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
      `}</style>
    </div>
  );
}
