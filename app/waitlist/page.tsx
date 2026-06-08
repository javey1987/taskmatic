// app/waitlist/page.tsx — Join the Taskmatic waitlist
'use client';

import { useState } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: 24 }}>
      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🚀</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Taskmatic Payments<br />Are Coming Soon
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          We're finalizing our payment provider. Leave your email and we'll <strong>ping you the second</strong> you can subscribe.
        </p>

        {status === 'success' ? (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>✅</div>
            <p style={{ fontWeight: 600, color: '#166534' }}>{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)',
                fontSize: '0.95rem', outline: 'none', background: 'var(--bg-card)'
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '12px 24px', borderRadius: 10, border: 'none',
                background: 'var(--brand)', color: '#fff', fontWeight: 700,
                fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              {status === 'loading' ? '⏳...' : 'Notify Me'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ color: '#dc2626', marginTop: 12, fontSize: '0.88rem' }}>{message}</p>
        )}

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 16 }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </main>
  );
}
