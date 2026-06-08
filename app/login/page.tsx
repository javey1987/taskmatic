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

  async function handleGoogleSignIn() {
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <a href="/" className="logo" style={{ fontSize: '1.4rem', textAlign: 'center', display: 'block', marginBottom: 24 }}>Task<span style={{ color: 'var(--brand)' }}>matic</span></a>
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Sign In</h2>
        <p style={{ textAlign: 'center', color: 'var(--text2)', marginBottom: 24 }}>Welcome back to Taskmatic</p>

        {error && <div className="alert alert-error">{error}</div>}

        <button className="google-btn" onClick={handleGoogleSignIn}>
          <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 10 }}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          Sign in with Google
        </button>

        <div className="divider"><span>or sign in with email</span></div>

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
        .google-btn {
          width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--border);
          background: #fff; font-size: 0.95rem; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s; margin-bottom: 20px;
        }
        .google-btn:hover { background: var(--bg-muted); }
        .divider {
          text-align: center; border-bottom: 1px solid var(--border);
          line-height: 0.1em; margin: 24px 0 20px;
        }
        .divider span {
          background: #fff; padding: 0 12px;
          color: var(--text-muted); font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
