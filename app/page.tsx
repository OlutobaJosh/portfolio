'use client';
import { useState, useEffect, useRef } from 'react';
import { SiUpwork, SiGithub, SiX } from 'react-icons/si'; // <-- It is completely removed from here
import { FaLinkedin } from 'react-icons/fa';
// ─── CSS ────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #0b0d1a;
  --bg2:      #0f1224;
  --bg3:      #141830;
  --bg4:      #1a2040;
  --cyan:     #00d4ff;
  --cyan2:    #00a8cc;
  --pink:     #ff2d78;
  --pink2:    #e0006a;
  --white:    #e8edf5;
  --muted:    #8892a4;
  --border:   rgba(0,212,255,0.15);
}

html, body {
  background: var(--bg);
  font-family: 'Poppins', sans-serif;
  color: var(--white);
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--cyan2); border-radius: 4px; }

::selection { background: var(--cyan); color: var(--bg); }

/* ── Glow ring portrait ── */
@keyframes rotateRing {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 20px var(--cyan), 0 0 60px rgba(0,212,255,0.3), 0 0 120px rgba(0,212,255,0.15); }
  50%      { box-shadow: 0 0 30px var(--cyan), 0 0 80px rgba(0,212,255,0.5), 0 0 160px rgba(0,212,255,0.2); }
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes orb1 {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.7; }
  33%      { transform: translate(15px,-20px) scale(1.2); opacity: 1; }
  66%      { transform: translate(-10px,10px) scale(0.9); opacity: 0.5; }
}
@keyframes orb2 {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.5; }
  33%      { transform: translate(-20px,15px) scale(0.8); opacity: 0.8; }
  66%      { transform: translate(10px,-10px) scale(1.1); opacity: 0.6; }
}
@keyframes orb3 {
  0%,100% { transform: translate(0,0); opacity: 0.6; }
  50%      { transform: translate(18px,18px); opacity: 1; }
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes countUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes slideIn {
  from { width: 0; }
  to   { width: 50px; }
}

.anim-up    { animation: fadeUp   0.8s cubic-bezier(0.25,0.1,0.25,1) both; }
.anim-left  { animation: fadeLeft 0.8s cubic-bezier(0.25,0.1,0.25,1) both; }
.anim-right { animation: fadeRight 0.8s cubic-bezier(0.25,0.1,0.25,1) both; }

/* ── Buttons ── */
.btn-hire {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 32px; border-radius: 4px;
  border: 2px solid var(--cyan);
  color: var(--cyan);
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem; font-weight: 600; letter-spacing: 0.05em;
  text-decoration: none; cursor: pointer; background: transparent;
  transition: all 0.3s;
}
.btn-hire:hover {
  background: var(--cyan); color: var(--bg);
  box-shadow: 0 0 20px rgba(0,212,255,0.4);
}
.btn-contact {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 32px; border-radius: 4px;
  background: linear-gradient(135deg, var(--cyan), var(--cyan2));
  color: var(--bg);
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem; font-weight: 600; letter-spacing: 0.05em;
  text-decoration: none; cursor: pointer; border: none;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(0,212,255,0.3);
}
.btn-contact:hover { box-shadow: 0 6px 28px rgba(0,212,255,0.5); transform: translateY(-2px); }

.btn-cv {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 18px; border-radius: 4px;
  background: linear-gradient(135deg, var(--pink), var(--pink2));
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em;
  text-decoration: none; border: none; cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(255,45,120,0.35);
}
.btn-cv:hover { box-shadow: 0 6px 24px rgba(255,45,120,0.55); transform: translateY(-1px); }

/* ── Nav link ── */
.nav-link {
  position: relative; color: var(--muted); font-size: 0.875rem; font-weight: 500;
  text-decoration: none; padding-bottom: 4px; transition: color 0.2s;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
  background: var(--cyan); transition: width 0.3s;
}
.nav-link:hover { color: var(--cyan); }
.nav-link:hover::after { width: 100%; }
.nav-link.active { color: var(--white); }
.nav-link.active::after { width: 100%; }

/* ── Section heading underline ── */
.section-title {
  font-size: clamp(1.8rem,4vw,2.5rem);
  font-weight: 700; color: var(--white);
  margin-bottom: 8px;
  position: relative; display: inline-block;
}
.section-title::after {
  content: ''; position: absolute;
  bottom: -8px; left: 0; width: 50px; height: 3px;
  background: linear-gradient(90deg, var(--cyan), transparent);
}

/* ── Skill bar ── */
.skill-bar-fill {
  height: 100%; border-radius: 100px;
  background: linear-gradient(90deg, var(--cyan), var(--cyan2));
  box-shadow: 0 0 10px rgba(0,212,255,0.4);
  transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
}

/* ── Project card ── */
.proj-card {
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.proj-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,212,255,0.15);
  border-color: var(--cyan);
}

/* ── Service card ── */
.svc-card {
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: 12px; padding: clamp(20px,3vw,32px);
  transition: all 0.3s; text-align: center;
}
.svc-card:hover {
  background: var(--bg4); border-color: var(--cyan);
  box-shadow: 0 8px 32px rgba(0,212,255,0.12);
  transform: translateY(-4px);
}
.svc-icon {
  width: 64px; height: 64px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.25);
  font-size: 1.75rem;
  transition: all 0.3s;
}
.svc-card:hover .svc-icon {
  background: rgba(0,212,255,0.2);
  box-shadow: 0 0 20px rgba(0,212,255,0.3);
}

/* ── Reveal on scroll ── */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── Social icons ── */
.social-icon {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1.5px solid var(--cyan);
  display: flex; align-items: center; justify-content: center;
  color: var(--cyan); font-size: 0.9rem;
  text-decoration: none; transition: all 0.3s;
}
.social-icon:hover {
  background: var(--cyan); color: var(--bg);
  box-shadow: 0 0 16px rgba(0,212,255,0.5);
}

/* ── Shimmer text ── */
.shimmer-text {
  background: linear-gradient(90deg, var(--cyan) 0%, #fff 40%, var(--cyan) 80%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
`;

// ─── TYPEWRITER ──────────────────────────────────────────────────────────────
function Typewriter({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[idx];
    let timeout;
    if (!deleting) {
      if (displayed.length < full.length) {
        timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setDeleting(false);
        setIdx((idx + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, phrases]);

  return (
    <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>
      {displayed}
      <span style={{ animation: 'blink 1s step-end infinite', borderRight: '2px solid var(--cyan)', marginLeft: '2px' }} />
    </span>
  );
}

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      const g = el.closest('[data-group]');
      if (g) {
        const items = Array.from(g.querySelectorAll<HTMLElement>('.reveal'));
        el.style.transitionDelay = `${items.indexOf(el) * 0.1}s`;
      }
      obs.observe(el);  // ← was missing: actually attach the observer
    });             // ← closes forEach

    return () => obs.disconnect(); // ← cleanup
  }, []);           // ← closes useEffect
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Home','About','Skills','Services','Projects','Contact'];
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(12px,2vw,20px) clamp(20px,5vw,80px)',
        background: scrolled ? 'rgba(11,13,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none',
        transition: 'all 0.3s',
      }}>
        <a href="#" style={{ fontWeight: 800, fontSize: '1.4rem', textDecoration: 'none' }}>
          <span style={{ color: 'var(--white)' }}>Port</span><span style={{ color: 'var(--cyan)' }}>folio</span>
        </a>
        <div className="hidden md:flex" style={{ display: 'flex', gap: 'clamp(16px,3vw,36px)', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <a
          href="https://cxmhvxubhkkvqxilrtxo.supabase.co/storage/v1/object/public/Images/Portfolio%20Website/Joshua-Asiribo-CV.pdf"
          download="Joshua-Asiribo-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cv"
          style={{ display: 'flex' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Download CV
        </a>
      </nav>
      <style>{`@media(max-width:768px){.hidden.md\\:flex{display:none!important}}`}</style>
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,80px) clamp(40px,5vw,60px)',
      background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,212,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(255,45,120,0.04) 0%, transparent 60%), var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* LEFT — Glowing portrait */}
        <div style={{ display: 'flex', justifyContent: 'center' }} className="anim-left">
          <div style={{ position: 'relative', width: 'clamp(220px,35vw,340px)', height: 'clamp(220px,35vw,340px)', animation: 'float 5s ease-in-out infinite' }}>
            {/* Rotating gradient ring */}
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--cyan), transparent 40%, var(--cyan) 60%, transparent 80%, var(--cyan))',
              animation: 'rotateRing 4s linear infinite',
              zIndex: 0,
            }} />
            {/* Portrait circle */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid var(--bg)',
              zIndex: 1,
              animation: 'glowPulse 3s ease-in-out infinite',
            }}>
              <img
                src="https://cxmhvxubhkkvqxilrtxo.supabase.co/storage/v1/object/public/Images/Portfolio%20Website/Joshua-Asiribo.png.png"
                alt="Joshua Asiribo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
            {/* Orb decorations */}
            {[
              { size: 14, top: '5%', right: '5%', color: 'var(--cyan)', anim: 'orb1 4s ease-in-out infinite' },
              { size: 10, bottom: '10%', left: '0%', color: 'var(--pink)', anim: 'orb2 5s ease-in-out infinite' },
              { size: 8,  top: '50%', right: '-5%', color: 'var(--cyan)', anim: 'orb3 3.5s ease-in-out infinite' },
              { size: 12, top: '15%', left: '-3%',  color: 'rgba(0,212,255,0.6)', anim: 'orb2 6s ease-in-out infinite' },
            ].map((o, i) => (
              <div key={i} style={{
                position: 'absolute', width: o.size, height: o.size,
                borderRadius: '50%', background: o.color,
                top: o.top, bottom: o.bottom, left: o.left, right: o.right,
                boxShadow: `0 0 ${o.size * 2}px ${o.color}`,
                animation: o.anim, zIndex: 2,
              }} />
            ))}
          </div>
        </div>

        {/* RIGHT — Content */}
        <div style={{ animation: 'fadeRight 0.9s 0.2s cubic-bezier(0.25,0.1,0.25,1) both' }}>
          <p style={{ fontSize: 'clamp(0.85rem,1.5vw,1.1rem)', fontWeight: 400, color: 'var(--muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>Hello, I&apos;m</p>

          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.1, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Joshua Asiribo
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 500, marginBottom: '20px', color: 'var(--muted)' }}>
            And I&apos;m a{' '}
            <Typewriter phrases={[
              'Full-Stack Developer',
              'AI Integration Expert',
              'Next.js Specialist',
              'Supabase Developer',
              'Stripe Integration Dev',
              'AI-Powered Web Dev',
            ]} />
          </p>

          <p style={{ fontSize: 'clamp(0.82rem,1.4vw,0.95rem)', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '460px', marginBottom: '24px' }}>
            Software Engineering student at Miva Open University, Nigeria. I build, debug, deploy and integrate AI into full-stack web applications that ship to production and work in the real world.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {[
    { label: 'Upwork',      Icon: SiUpwork,   color: '#6FDA44', href: 'https://www.upwork.com/freelancers/joshuaasiribo' },
    { label: 'GitHub',      Icon: SiGithub,   color: '#181717', href: 'https://github.com/OlutobaJosh' },
    { label: 'LinkedIn',    Icon: FaLinkedin, color: '#0A66C2', href: 'https://linkedin.com/in/joshuaasiribo' },
    { label: 'X (Twitter)', Icon: SiX,        color: '#000000', href: 'https://twitter.com/OlutobaJosh' },
  // ✅ FIXED
  ].map(s => (
    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
      style={{ color: s.color, display: 'flex' }}>
      <s.Icon size={22} />
    </a>
  ))}
</div>

{/* Buttons */}
<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://www.upwork.com/freelancers/joshuaasiribo" target="_blank" rel="noopener noreferrer" className="btn-hire">Hire Me</a>
            <a href="#contact" className="btn-contact">Contact Me</a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        borderTop: '1px solid rgba(0,212,255,0.1)', marginTop: 'clamp(40px,6vw,64px)',
        paddingTop: 'clamp(24px,4vw,40px)',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: '16px', position: 'relative', zIndex: 1,
      }}>
        {[
          { val: '4+',   label: 'Live Projects' },
          { val: '100+', label: 'Hours Debugging' },
          { val: '3',    label: 'AI Models Integrated' },
          { val: '100%', label: 'Client Satisfaction' },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: 'clamp(12px,2vw,20px)',
            borderRight: i < 3 ? '1px solid rgba(0,212,255,0.1)' : 'none',
          }}>
            <p className="shimmer-text" style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', lineHeight: 1 }}>{s.val}</p>
            <p style={{ fontSize: 'clamp(0.65rem,1.2vw,0.8rem)', color: 'var(--muted)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.05em' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
        {/* Photo */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 'clamp(240px,35vw,380px)' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--border)', boxShadow: '0 0 40px rgba(0,212,255,0.1)' }}>
              <img src="https://cxmhvxubhkkvqxilrtxo.supabase.co/storage/v1/object/public/Images/Portfolio%20Website/Joshua-Asiribo.png.png" alt="Joshua" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
            {/* Decorative corner */}
            <div style={{ position: 'absolute', bottom: -16, right: -16, width: '120px', height: '120px', border: '2px solid var(--cyan)', borderRadius: '8px', zIndex: -1, opacity: 0.4 }} />
          </div>
        </div>

        {/* Text */}
        <div className="reveal">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>Get to know me</p>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>About Me</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 'clamp(0.85rem,1.5vw,0.95rem)', marginBottom: '20px' }}>
            I&apos;m Joshua Asiribo — a 300-level Software Engineering student at Miva Open University, Nigeria. I combine AI tools with solid engineering fundamentals to ship production-ready full-stack web applications at speed.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 'clamp(0.85rem,1.5vw,0.95rem)', marginBottom: '28px' }}>
            Every project in my portfolio is live, tested, and functional. I don&apos;t just generate code — I debug it, fix TypeScript errors, handle deployment issues, and make sure everything actually runs in production. I specialise in Next.js, Supabase, Stripe, and integrating AI models into real products.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {[
              { label: 'Name', val: 'Joshua Asiribo' },
              { label: 'Degree', val: 'BSc Software Engineering' },
              { label: 'Location', val: 'Nigeria 🇳🇬' },
              { label: 'Available', val: 'Worldwide ✅' },
            ].map(d => (
              <p key={d.label} style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{d.label}: </span>{d.val}
              </p>
            ))}
          </div>
          <a href="https://www.upwork.com/freelancers/joshuaasiribo" target="_blank" rel="noopener noreferrer" className="btn-contact">Hire Me Now</a>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS SECTION ──────────────────────────────────────────────────────────
const SKILLS_DATA = [
  { name: 'Next.js / React',      pct: 90 },
  { name: 'TypeScript',           pct: 82 },
  { name: 'Supabase / PostgreSQL',pct: 85 },
  { name: 'Node.js / Express',    pct: 80 },
  { name: 'Stripe Integration',   pct: 88 },
  { name: 'AI / LLM Integration', pct: 85 },
  { name: 'Tailwind CSS',         pct: 92 },
  { name: 'Git / Deployment',     pct: 87 },
];

function SkillBar({ name, pct }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setWidth(pct), 200); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--white)' }}>{name}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(0,212,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

const TECH_PILLS = [
  { name: 'Next.js 14', color: '#fff' },
  { name: 'React.js',   color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Supabase',   color: '#3ecf8e' },
  { name: 'Stripe',     color: '#635bff' },
  { name: 'Groq AI',    color: '#00d4ff' },
  { name: 'Node.js',    color: '#68a063' },
  { name: 'SQLite',     color: '#003b57' },
  { name: 'Tailwind',   color: '#38bdf8' },
  { name: 'Gmail API',  color: '#ea4335' },
  { name: 'Render',     color: '#46e3b7' },
  { name: 'Git/GitHub', color: '#f05032' },
];

const CERTS = [
  { icon: '🏆', name: 'Content Marketing', issuer: 'HubSpot Academy' },
  { icon: '☁️', name: 'Prompt Design in Vertex AI', issuer: 'Google Cloud' },
  { icon: '🤖', name: 'Claude Code 101', issuer: 'Anthropic' },
];

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>What I know</p>
          <h2 className="section-title" style={{ display: 'block', textAlign: 'center' }}>Technical Skills</h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg,var(--cyan),transparent)', margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,60px)' }}>
          {/* Skill bars */}
          <div className="reveal">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '28px' }}>Proficiency</h3>
            {SKILLS_DATA.map(s => <SkillBar key={s.name} {...s} />)}
          </div>

          {/* Tech pills + certs */}
          <div className="reveal">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '20px' }}>Technologies</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
              {TECH_PILLS.map(t => (
                <span key={t.name} style={{
                  padding: '6px 14px', borderRadius: '100px',
                  border: `1px solid ${t.color}40`, background: `${t.color}10`,
                  color: t.color, fontSize: '0.78rem', fontWeight: 600,
                }}>{t.name}</span>
              ))}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '20px' }}>Certifications</h3>
            {CERTS.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', padding: '14px', background: 'var(--bg3)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '1.6rem' }}>{c.icon}</span>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)' }}>{c.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cyan)' }}>{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '⚡', title: 'AI-Powered Web Apps',     desc: 'Full-stack apps with AI features — chatbots, generators, smart automation — using Groq, Gemini and LLaMA APIs.' },
  { icon: '🛒', title: 'E-commerce Development',  desc: 'Complete stores with Stripe payments, cart systems, product management and order tracking — ready to take real money.' },
  { icon: '📊', title: 'SaaS Dashboards',          desc: 'Data-rich dashboards with real-time charts, Supabase Auth, role management and responsive design.' },
  { icon: '🔧', title: 'Debugging & Deployment',  desc: 'Stuck on errors? I fix TypeScript issues, handle Render/Vercel deployments and sort production problems.' },
  { icon: '🤖', title: 'AI Integration',           desc: 'Add AI to any website — chatbots, content generators, smart forms using the latest LLM APIs.' },
  { icon: '🎬', title: 'Product Video Ads',        desc: '15–30 second product video ads for social media, Shopify stores and landing pages.' },
];

function ServicesSection() {
  return (
    <section id="services" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>What I offer</p>
          <h2 className="section-title" style={{ display: 'block', textAlign: 'center' }}>My Services</h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg,var(--cyan),transparent)', margin: '16px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }} data-group>
          {SERVICES.map((s, i) => (
            <div key={i} className="svc-card reveal">
              <div className="svc-icon">{s.icon}</div>
              <h3 style={{ fontSize: 'clamp(0.95rem,1.8vw,1.1rem)', fontWeight: 700, color: 'var(--white)', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontSize: 'clamp(0.8rem,1.3vw,0.875rem)', color: 'var(--muted)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
const PROJECTS = [
  { emoji: '🏋️', name: 'BookEase', label: 'Fitness Booking + AI', desc: 'Full-stack booking platform with AI training plan generator powered by Groq LLaMA 3.1. Admin dashboard, Supabase database, cookie auth.', url: 'https://bookease-42jk.onrender.com', tags: ['Next.js 14','Supabase','Groq AI','Admin Dashboard'], accent: '#56B06A', bg: 'linear-gradient(135deg,#0D1F12,#1A4028)' },
  { emoji: '📊', name: 'Vela Analytics', label: 'SaaS Dashboard', desc: 'Premium e-commerce analytics dashboard with Recharts visualisations, Supabase Auth, orders/customer tables and 90-day demo data.', url: 'https://vela-u7sa.onrender.com', tags: ['Next.js 14','Supabase Auth','Recharts','TypeScript'], accent: '#6366F1', bg: 'linear-gradient(135deg,#060914,#0F1B3D)' },
  { emoji: '🛒', name: 'Axon Store', label: 'E-commerce + Stripe', desc: 'Premium tech accessories store with real Stripe payments, localStorage cart, product filtering, and complete checkout-to-success flow.', url: 'https://axon-3dz1.onrender.com', tags: ['Next.js 14','Stripe','Supabase','Cart'], accent: '#F59E0B', bg: 'linear-gradient(135deg,#1C1200,#3D2800)' },
  { emoji: '🏠', name: 'GreyHaven', label: 'Property Management + AI', desc: 'Enterprise property platform with AI chatbot assistant, digital lease signing, Gmail API email automation and SQLite database.', url: 'https://greyhaven-j8rq.onrender.com', tags: ['Node.js','Express','SQLite','Groq AI','Gmail API'], accent: '#7FFFC4', bg: 'linear-gradient(135deg,#0A1422,#162040)' },
];

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>My work</p>
          <h2 className="section-title" style={{ display: 'block', textAlign: 'center' }}>Live Projects</h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg,var(--cyan),transparent)', margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '24px' }} data-group>
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card reveal">
              {/* Card visual */}
              <div style={{ height: '180px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>{p.emoji}</span>
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '100px', background: `${p.accent}20`, border: `1px solid ${p.accent}40`, color: p.accent, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em' }}>{p.label}</span>
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: 'clamp(16px,2.5vw,24px)' }}>
                <h3 style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', fontWeight: 700, color: 'var(--white)', marginBottom: '8px' }}>{p.name}</h3>
                <p style={{ fontSize: 'clamp(0.78rem,1.3vw,0.85rem)', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '16px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: '3px 10px', borderRadius: '100px', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--cyan)', fontSize: '0.7rem', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: p.accent, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'gap 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                  View Live
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    // Opens email client with form data pre-filled
    const subject = encodeURIComponent(form.subject || 'Project Inquiry from Portfolio');
    const body = encodeURIComponent(
      `Hi Joshua,\n\nMy name is ${form.name}.\n\n${form.message}\n\nReply to: ${form.email}`
    );
    window.location.href = `mailto:asiribojoshua@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setStatus('sent'); }, 500);
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }, 4000);
  }

  const fieldStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,212,255,0.2)',
    borderRadius: '8px', color: '#e8edf5',
    fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(24px,4vw,40px)', marginTop: '40px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '24px', textAlign: 'center' }}>
        Or send a message directly
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Your Name *</label>
          <input
            name="name" value={form.name} onChange={set} required
            placeholder="Jane Smith"
            style={fieldStyle}
            onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Your Email *</label>
          <input
            type="email" name="email" value={form.email} onChange={set} required
            placeholder="jane@company.com"
            style={fieldStyle}
            onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
          />
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Subject</label>
        <input
          name="subject" value={form.subject} onChange={set}
          placeholder="Project Inquiry"
          style={fieldStyle}
          onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
          onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Message *</label>
        <textarea
          name="message" value={form.message} onChange={set} required
          rows={5} placeholder="Tell me about your project..."
          style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }}
          onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
          onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
        />
      </div>

      {status === 'sent' && (
        <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--cyan)', fontSize: '0.875rem', marginBottom: '16px' }}>
          ✅ Your email client has opened with your message!
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-contact"
        style={{ width: '100%', padding: '14px', fontSize: '0.95rem', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
      >
        {status === 'sending' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <span style={{ width: '16px', height: '16px', border: '2px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'rotateRing 0.8s linear infinite' }} />
            Opening email...
          </span>
        ) : '📨 Send Message'}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '12px' }}>
        This will open your default email client · Or email directly: asiribojoshua@gmail.com
      </p>
    </form>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      {/* Bg glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>Get in touch</p>
          <h2 className="section-title" style={{ display: 'block', textAlign: 'center', fontSize: 'clamp(2rem,5vw,3rem)' }}>Contact Me</h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg,var(--cyan),transparent)', margin: '16px auto 28px' }} />
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Available for freelance projects worldwide. Whether you need a full web app, AI integration, or want something fixed — I&apos;m ready.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
            <a href="https://www.upwork.com/freelancers/joshuaasiribo" target="_blank" rel="noopener noreferrer" className="btn-contact" style={{ fontSize: '0.95rem', padding: '14px 36px' }}>🚀 Hire Me </a>
            <a href="mailto:asiribojoshua@gmail.com?subject=Project%20Inquiry%20-%20Portfolio&body=Hi%20Joshua%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%0A%0A" className="btn-hire" style={{ fontSize: '0.95rem', padding: '14px 36px' }}>✉️ Send Email</a>
          </div>

          {/* Contact Form */}
          <ContactForm />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {[
              { icon: '📍', label: 'Location', val: 'Nigeria · Remote Worldwide' },
              { icon: '⚡', label: 'Response Time', val: 'Within 24 hours' },
              { icon: '💬', label: 'Language', val: 'English (Fluent)' },
            ].map(c => (
              <div key={c.label} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '12px', padding: 'clamp(14px,2.5vw,24px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>{c.icon}</span>
                <p style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{c.label}</p>
                <p style={{ fontSize: 'clamp(0.75rem,1.2vw,0.85rem)', fontWeight: 600, color: 'var(--white)' }}>{c.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid rgba(0,212,255,0.08)', padding: 'clamp(20px,3vw,28px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>
          <span style={{ color: 'var(--white)' }}>Port</span><span style={{ color: 'var(--cyan)' }}>folio</span>
          <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.85rem', marginLeft: '8px' }}>Joshua Asiribo</span>
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>© {new Date().getFullYear()} Joshua Asiribo. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useReveal();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ overflowX: 'clip' }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
