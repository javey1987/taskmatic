// app/page.tsx - Taskmatic Landing Page
'use client';

import { useEffect } from 'react';

// Read the HTML content from the public folder at build time
// Since we can't use fs in client components, we'll embed the HTML

export default function HomePage() {
  useEffect(() => {
    // Initialize Paddle.js after page loads
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.onload = () => {
      try {
        (window as any).Paddle?.Initialize({
          token: 'live_b504ee42eb9973a12f6d88e3732'
        });
      } catch(e) {
        console.warn('Paddle init error:', e);
      }
    };
    document.body.appendChild(script);

    // Fallback checkout function
    (window as any).PaddleCheckout = function(priceId: string) {
      try {
        (window as any).Paddle?.Checkout?.open({
          items: [{ priceId, quantity: 1 }]
        });
      } catch(e) {
        window.open('https://checkout.paddle.com/checkout/' + priceId, 'paddle-checkout', 'width=800,height=700');
      }
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <div className="container">
        <nav>
          <a href="#" className="logo">Task<span>matic</span></a>
          <div className="nav-links">
            <a href="/free/social-post">Free Tools</a>
            <a href="#templates">Templates</a>
            <a href="/blog">Blog</a>
            <a href="#pricing">Pricing</a>
            <button className="btn-nav" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">🚀 Used by 500+ solo business owners</div>
          <h1>AI Automation That <em>Just Works</em>.<br />No Coding. No Prompts.</h1>
          <p>Pick a template, fill in a few details, and let AI handle the busywork. From client follow-ups to content repurposing — in minutes, not hours.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Try Free →</button>
            <button className="btn-secondary" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>See Templates</button>
          </div>
          <div className="hero-stats">
            <div><strong>10,000+</strong><span>Tasks Automated</span></div>
            <div><strong>4.8★</strong><span>Avg. Rating</span></div>
            <div><strong>85%</strong><span>Time Saved</span></div>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="section" id="templates">
        <div className="container">
          <div className="section-title">
            <h2>Pre-built Templates. Ready in Seconds.</h2>
            <p>Three proven workflows to automate the repetitive parts of your business.</p>
          </div>
          <div className="grid-4">
            <div className="template-card">
              <div className="icon">📧</div>
              <h3>Client Follow-Up Automator</h3>
              <p>Never lose a customer to silence. Auto-send thank-you notes, check-in emails, and review requests — timed perfectly.</p>
              <div className="tag">Automated Emails</div>
            </div>
            <div className="template-card">
              <div className="icon">📤</div>
              <h3>Content Repurposer</h3>
              <p>Turn one blog post, podcast, or video into a Twitter thread, LinkedIn article, and newsletter summary.</p>
              <div className="tag">Multi-Platform</div>
            </div>
            <div className="template-card">
              <div className="icon">📊</div>
              <h3>Weekly Report Generator</h3>
              <p>Jotted down a few notes this week? Taskmatic turns your scraps into a polished client-ready report in under 30 seconds.</p>
              <div className="tag">PDF Export</div>
            </div>
            <div className="template-card">
              <div className="icon">📱</div>
              <h3>Social Post Generator</h3>
              <p>Write once, publish everywhere. Turn one idea into posts for Twitter/X, LinkedIn, Reddit, and your newsletter — in under 30 seconds.</p>
              <div className="tag">Lead Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" style={{ background: 'var(--bg-muted)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Three simple steps to automation.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h4>Pick a Template</h4>
              <p>Choose from our library of pre-built AI workflows designed for solo business owners.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h4>Fill in the Basics</h4>
              <p>Enter a few details — your customer&apos;s name, a link to your content, or your weekly notes.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h4>Get Results Instantly</h4>
              <p>AI generates your emails, posts, or reports. Copy, export, or schedule — done in under a minute.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ paddingTop: 16, paddingBottom: 40 }}>
        <div className="container">
          <div className="section-title">
            <h2>What Users Say</h2>
            <p>Real feedback from solo business owners using Taskmatic.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'24px' }}>
              <div style={{ color:'#f59e0b', marginBottom:8 }}>★★★★★</div>
              <p style={{ fontSize:'.88rem', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:12 }}>"The follow-up email template alone saved me hours. I was manually writing thank-you notes — never again."</p>
              <div style={{ fontWeight:700, fontSize:'.82rem' }}>— Alex R., Freelance Designer</div>
            </div>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'24px' }}>
              <div style={{ color:'#f59e0b', marginBottom:8 }}>★★★★★</div>
              <p style={{ fontSize:'.88rem', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:12 }}>"I was spending 2 hours a week on client reports. Now it takes 30 seconds. Game changer."</p>
              <div style={{ fontWeight:700, fontSize:'.82rem' }}>— Maria K., Social Media Consultant</div>
            </div>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'24px' }}>
              <div style={{ color:'#f59e0b', marginBottom:8 }}>★★★★★</div>
              <p style={{ fontSize:'.88rem', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:12 }}>"The social post generator made me actually post consistently. My engagement doubled in 2 weeks."</p>
              <div style={{ fontWeight:700, fontSize:'.82rem' }}>— James L., SaaS Founder</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="section-title">
            <h2>Simple Pricing. No Surprises.</h2>
            <p>Start free. Upgrade when you&apos;re ready to automate more.</p>
          </div>
          <div className="pricing-grid">
            <div className="plan">
              <div className="name">Free</div>
              <div className="price"><sup>$</sup>0</div>
              <div className="desc">Perfect for trying things out</div>
              <ul>
                <li>1 template</li>
                <li>5 runs per month</li>
                <li>Basic output formats</li>
                <li>Community support</li>
              </ul>
              <button className="btn-plan outline">Get Started</button>
            </div>

            <div className="plan featured">
              <div className="badge">Most Popular</div>
              <div className="name">Pro</div>
              <div className="price"><sup>$</sup>19 <span>/month</span></div>
              <div className="desc">1-month free trial — cancel anytime</div>
              <ul>
                <li><strong>All 4 templates</strong></li>
                <li>50 runs per month</li>
                <li>PDF export</li>
                <li>Email support</li>
              </ul>
              <button className="btn-plan primary paddle-btn" onClick={() => {
                const w = window as any;
                if (w.Paddle?.Checkout) {
                  w.Paddle.Checkout.open({ items: [{ priceId: 'pri_01ktg7qjrc19ky14gg292ndj28', quantity: 1 }] });
                } else {
                  window.open('https://checkout.paddle.com/checkout/pri_01ktg7qjrc19ky14gg292ndj28', '_blank');
                }
              }}>Start Free Trial →</button>
            </div>

            <div className="plan">
              <div className="name">Unlimited</div>
              <div className="price"><sup>$</sup>39 <span>/month</span></div>
              <div className="desc">1-month free trial — cancel anytime</div>
              <ul>
                <li><strong>All 4 templates</strong></li>
                <li>Unlimited runs</li>
                <li>PDF export + priority</li>
                <li>Priority support</li>
              </ul>
              <button className="btn-plan outline paddle-btn" onClick={() => {
                const w = window as any;
                if (w.Paddle?.Checkout) {
                  w.Paddle.Checkout.open({ items: [{ priceId: 'pri_01ktg7qpwnww8e0ev17mpjr1gy', quantity: 1 }] });
                } else {
                  window.open('https://checkout.paddle.com/checkout/pri_01ktg7qpwnww8e0ev17mpjr1gy', '_blank');
                }
              }}>Start Free Trial →</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" id="cta">
        <div className="container">
          <div className="cta">
            <h2>Stop Busywork. Start Growing.</h2>
            <p>Join 500+ solo business owners who&apos;ve automated the boring stuff. Free to start.</p>
            <button className="btn-primary" style={{ background: '#fff', color: 'var(--brand)' }}
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started Free →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="logo" style={{ fontSize: '1.1rem' }}>Task<span>matic</span></div>
          <div className="links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/refund">Refund Policy</a>
            <a href="mailto:hello@taskmatic.io">Contact</a>
          </div>
          <div className="copy">© 2026 Taskmatic. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
