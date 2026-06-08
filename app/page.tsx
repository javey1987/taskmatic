// app/page.tsx - Taskmatic Landing Page
'use client';

import { useEffect } from 'react';

// Read the HTML content from the public folder at build time
// Since we can't use fs in client components, we'll embed the HTML

export default function HomePage() {
  useEffect(() => {
    // Paddle payment will be initialized when approved — currently redirecting to /waitlist
  }, []);

  return (
    <>
      {/* NAV */}
      <div className="container">
        <nav>
          <a href="/" className="logo">Task<span>matic</span></a>
          <div className="nav-links">
            <a href="/free/social-post">Free Tools</a>
            <a href="#templates">Templates</a>
            <a href="/blog">Blog</a>
            <a href="#pricing">Pricing</a>
            <button className="btn-nav" onClick={() => window.location.href='/register'}>Get Started</button>
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
            <button className="btn-primary" onClick={() => window.location.href='/register'}>Try Free →</button>
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
            <h2>8 Templates. Ready in Seconds.</h2>
            <p>Eight proven templates to automate the repetitive parts of your business.</p>
          </div>
          <div className="grid-8">
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
            <div className="template-card">
              <div className="icon">🔍</div>
              <h3>Market Research Assistant</h3>
              <p>Research competitors, trends, and opportunities. AI searches the web and synthesizes findings into a structured report.</p>
              <div className="tag">Research</div>
            </div>
            <div className="template-card">
              <div className="icon">📨</div>
              <h3>Cold Email Engine</h3>
              <p>Generate a complete cold email outreach sequence — from warm-up to follow-up. CAN-SPAM compliant and ready to send.</p>
              <div className="tag">Sales</div>
            </div>
            <div className="template-card">
              <div className="icon">✍️</div>
              <h3>SEO Blog Writer</h3>
              <p>Write a complete SEO-optimized blog post with headlines, meta description, keyword placement, and readability optimization.</p>
              <div className="tag">Content</div>
            </div>
            <div className="template-card">
              <div className="icon">💼</div>
              <h3>Business Email Kit</h3>
              <p>Generate professional business emails for any scenario — meeting requests, follow-ups, thank-you notes, proposals, and more.</p>
              <div className="tag">Communication</div>
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
              <button className="btn-plan outline" onClick={() => window.location.href='/register'}>Get Started</button>
            </div>

            <div className="plan featured">
              <div className="badge">Most Popular</div>
              <div className="name">Pro</div>
              <div className="price"><sup>$</sup>19 <span>/month</span></div>
              <div className="desc">1-month free trial — cancel anytime</div>
              <ul>
                <li><strong>All 8 templates</strong></li>
                <li>50 runs per month</li>
                <li>PDF export</li>
                <li>Email support</li>
              </ul>
              <button className="btn-plan primary" onClick={() => window.location.href='/waitlist'}>Start Free Trial →</button>
            </div>

            <div className="plan">
              <div className="name">Unlimited</div>
              <div className="price"><sup>$</sup>39 <span>/month</span></div>
              <div className="desc">1-month free trial — cancel anytime</div>
              <ul>
                <li><strong>All 8 templates</strong></li>
                <li>Unlimited runs</li>
                <li>PDF export + priority</li>
                <li>Priority support</li>
              </ul>
              <button className="btn-plan outline" onClick={() => window.location.href='/waitlist'}>Start Free Trial →</button>
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
              onClick={() => window.location.href='/register'}>
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
