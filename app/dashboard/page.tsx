'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    fetch('/api/templates')
      .then(r => r.json())
      .then(setTemplates)
      .catch(console.error);
  }, []);

  if (status === 'loading') return <div className="dash-loading">Loading...</div>;
  if (!session) return null;

  const user = session.user as any;

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" className="logo" style={{ fontSize: '1.2rem' }}>Task<span>matic</span></a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="plan-badge">{user.plan}</span>
            <span style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>{user.email}</span>
            <button className="btn-nav" onClick={() => signOut({ callbackUrl: '/' })} style={{ fontSize: '0.85rem' }}>Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ marginBottom: 8 }}>Welcome, {user.name || 'there'} 👋</h1>
          <p style={{ color: 'var(--text2)' }}>Choose a template to get started. Your AI assistant is ready.</p>
        </div>

        <div className="template-grid">
          {templates.map(t => (
            <a key={t.id} href={`/templates/${t.slug}`} className="template-card-link">
              <div className="template-card">
                <div className="icon">{t.icon}</div>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <div className="tag">{t.category}</div>
              </div>
            </a>
          ))}
        </div>
      </main>

      <style>{`
        .dashboard { min-height: 100vh; background: var(--bg); }
        .dash-loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; color: var(--text2); }
        .dash-nav { border-bottom: 1px solid var(--border); padding: 14px 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 10; }
        .plan-badge { background: var(--brand); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .template-card-link { text-decoration: none; color: inherit; }
        .template-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 28px; transition: all 0.2s; }
        .template-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .template-card .icon { font-size: 2rem; margin-bottom: 12px; }
        .template-card h3 { margin-bottom: 8px; font-size: 1.1rem; }
        .template-card p { color: var(--text2); font-size: 0.9rem; line-height: 1.5; margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
