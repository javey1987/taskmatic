'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <a href="/" className="logo" style={{ fontSize: '1.4rem', textAlign: 'center', display: 'block', marginBottom: 24 }}>Task<span style={{ color: 'var(--brand)' }}>matic</span></a>
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Sign In</h2>
        <p style={{ textAlign: 'center', color: 'var(--text2)', marginBottom: 24 }}>Welcome back to Taskmatic</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)' }}>
          Don&apos;t have an account? <a href="/register" style={{ color: 'var(--brand)' }}>Sign Up</a>
        </p>
      </div>

      <style>{`
        .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 24px; }
        .login-card { background: #fff; border-radius: 16px; padding: 40px; width: 100%; max-width: 400px; box-shadow: 0 2px 20px rgba(0,0,0,0.06); }
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
