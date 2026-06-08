'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    // Auto sign in after registration
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      router.push('/login');
    } else {
      router.push('/templates/social-poster');
      router.refresh();
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <a href="/" className="logo" style={{ fontSize: '1.4rem', textAlign: 'center', display: 'block', marginBottom: 24 }}>Task<span style={{ color: 'var(--brand)' }}>matic</span></a>
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text2)', marginBottom: 24 }}>Start with a free plan — no credit card needed</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Free Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--brand)' }}>Sign In</a>
        </p>
      </div>

      <style>{`
        .register-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 24px; }
        .register-card { background: #fff; border-radius: 16px; padding: 40px; width: 100%; max-width: 400px; box-shadow: 0 2px 20px rgba(0,0,0,0.06); }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.9rem; color: var(--text); }
        .form-group input { width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
        .form-group input:focus { border-color: var(--brand); }
        .alert { padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 0.9rem; }
        .alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
      `}</style>
    </div>
  );
}
