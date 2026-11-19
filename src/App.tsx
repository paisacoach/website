import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Bot, ChevronRight, CreditCard, Menu, ShieldCheck, Sparkles, Target, TrendingUp, Wallet, X } from 'lucide-react'
import { APP_LAUNCH_STATUS, APP_STORE_URL, GOOGLE_PLAY_URL, navLinks } from './config/site'
import paisaLogo from './assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

function Logo({ compact = false }: { compact?: boolean }) {
  return <a className="brand" href="#home" aria-label="Paisa Coach home"><span className="brand-mark"><img src={paisaLogo} alt="" /></span>{!compact && <span className="brand-name">PAISA <b>COACH</b></span>}</a>
}

function StoreButton({ store, final = false }: { store: 'play' | 'app'; final?: boolean }) {
  const launched = APP_LAUNCH_STATUS === 'launched'
  const url = store === 'play' ? GOOGLE_PLAY_URL : APP_STORE_URL
  const content = <>
    <span className={`store-icon ${store}`} aria-hidden="true">{store === 'play' ? '▶' : '●'}</span>
    <span><small>{store === 'play' ? 'GET IT ON' : 'Download on the'}</small><strong>{store === 'play' ? 'Google Play' : 'App Store'}</strong></span>
    {!launched && <em>Coming Soon</em>}
  </>
  return launched && url
    ? <a className={`store-button ${final ? 'final' : ''}`} href={url} target="_blank" rel="noreferrer">{content}</a>
    : <button className={`store-button ${final ? 'final' : ''}`} type="button" disabled>{content}</button>
}

function PhoneMockup({ variant = 'hero' }: { variant?: 'hero' | 'coach' }) {
  if (variant === 'coach') return (
    <div className="phone phone-coach" aria-label="Illustrative AI financial coach conversation">
      <div className="phone-speaker" /><div className="mock-status"><span>9:41</span><span>•••  ▰</span></div>
      <div className="coach-head"><Bot size={18} /><div><strong>AI Coach</strong><small>Here to help</small></div></div>
      <div className="chat-area">
        <div className="chat-bubble coach">Let’s look at your monthly goals.</div>
        <div className="chat-bubble user">How can I manage my credit card debt?</div>
        <div className="chat-bubble coach">Start by reviewing interest rates and prioritizing higher-cost balances.</div>
      </div>
      <div className="chat-input"><span>Ask your coach...</span><ArrowRight size={15} /></div>
    </div>
  )
  return (
    <div className="phone" aria-label="Illustrative Paisa Coach finance dashboard">
      <div className="phone-speaker" /><div className="mock-status"><span>9:41</span><span>•••  ▰</span></div>
      <div className="phone-head"><div><small>Good morning</small><strong>Arjun</strong></div><span className="avatar">A</span></div>
      <div className="balance-card"><div className="balance-title"><span>Net position</span><TrendingUp size={14} /></div><strong>₹ 1,24,680</strong><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
      <div className="quick-grid"><div><span className="quick-icon"><Wallet size={14} /></span><small>Income</small><strong>₹52.4k</strong></div><div><span className="quick-icon"><CreditCard size={14} /></span><small>Expenses</small><strong>₹31.8k</strong></div></div>
      <div className="phone-section-title"><strong>Money overview</strong><ChevronRight size={14} /></div>
      <div className="goal-row"><div className="goal-ring">72%</div><div><small>Emergency fund</small><strong>₹36,000</strong></div></div>
      <div className="phone-nav"><span className="active">⌂</span><span>↗</span><span>◉</span><span>◎</span><span>♢</span></div>
    </div>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    if (!reduce) {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => gsap.fromTo(el, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
      gsap.to('.hero-phone', { y: -18, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 } })
    }
    return () => { window.removeEventListener('scroll', onScroll); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [reduce])

  return <main>
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`} aria-label="Primary navigation">
      <div className="nav-inner"><Logo /><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{navLinks.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}</div><a className="nav-cta" href="#download">Download App <ArrowRight size={15} /></a><button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
    </nav>

    <section id="home" className="hero-section">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={reduce ? false : 'hidden'} animate="visible">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>AI-POWERED PERSONAL FINANCE</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8 }}>Your Money.<br /><em>Your Goals.</em><br />Your Coach.</motion.h1>
          <motion.p className="hero-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55, duration: .8 }}>Meet your personal AI-powered financial companion. Understand your money, manage debt, build better habits, and move confidently toward your goals.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}><a className="button button-primary" href="#features">Explore Paisa Coach <ArrowRight size={17} /></a><a className="button button-ghost" href="#download">Download App</a></motion.div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduce ? false : { opacity: 0, scale: .94, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: .35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="floating-chip chip-top"><Sparkles size={16} /><span><small>AI insight</small><strong>Goal on track</strong></span></div>
          <div className="floating-chip chip-bottom"><Target size={16} /><span><small>This month</small><strong>72% disciplined</strong></span></div>
          <div className="hero-phone"><PhoneMockup /></div>
        </motion.div>
      </div>
    </section>

    <section className="problem-section section" id="problem">
      <Reveal className="section-heading gsap-reveal"><p className="eyebrow">THE REAL CHALLENGE</p><h2>Managing money<br />shouldn't feel <em>complicated.</em></h2></Reveal>
      <div className="problem-layout gsap-reveal">
        <div className="problem-list">{[['01','Where does it all go?','Understand everyday spending without the overwhelm.'],['02','Which debt comes first?','Bring multiple obligations into one clear picture.'],['03','How do I stay consistent?','Build discipline through practical, manageable habits.']].map(([number,title,text]) => <div className="problem-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        <div className="problem-visual"><div className="clarity-orb"><div className="orb-ring" /><div className="orb-core"><Wallet size={26} /><strong>Clarity</strong></div></div><p>Too many decisions.<br /><span>One clear direction.</span></p></div>
      </div>
    </section>

    <section className="features-section section" id="features">
      <Reveal className="section-heading centered gsap-reveal"><p className="eyebrow">INTRODUCING PAISA COACH</p><h2>A smarter way to understand<br /><em>your finances.</em></h2></Reveal>
      <div className="feature-stage gsap-reveal">
        <div className="feature-orbit">{[['01','Home','See your overall financial position'],['02','Activity','Understand financial activity'],['03','Debt','Organize and manage debts'],['04','Coach','Receive AI-powered guidance'],['05','Plans','Work toward financial goals'],['06','Rewards','Encourage positive habits']].map(([num,title,text],index) => <article className={`feature-node node-${index+1}`} key={title}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <div className="feature-phone"><PhoneMockup /></div>
      </div>
    </section>

    <section className="coach-section section">
      <div className="coach-grid">
        <Reveal className="coach-copy gsap-reveal"><p className="eyebrow">THE AI FINANCIAL COACH</p><h2>More than tracking.<br />A coach that helps you<br /><em>think smarter.</em></h2><p>Paisa Coach brings context to your financial situation, helping you understand options and approach decisions with greater clarity.</p><div className="coach-benefits"><span><Bot size={16} /> Personal guidance</span><span><ShieldCheck size={16} /> Thoughtful context</span><span><Target size={16} /> Goal-led support</span></div></Reveal>
        <Reveal className="coach-visual gsap-reveal"><div className="coach-glow" /><PhoneMockup variant="coach" /><div className="coach-signal"><span /><span /><span /><span /></div></Reveal>
      </div>
    </section>

    <section className="steps-section section">
      <Reveal className="section-heading centered gsap-reveal"><p className="eyebrow">HOW IT WORKS</p><h2>Your journey towards better<br /><em>financial habits starts here.</em></h2></Reveal>
      <div className="steps gsap-reveal">{[['01','Get Started','Create an account in the mobile application.'],['02','Understand Your Finances','Share your financial information through the onboarding experience, including voice-based input.'],['03','Move Forward','Use insights, planning tools, and AI guidance to improve financial habits.']].map(([num,title,text],index) => <article className="step" key={num}><div className="step-number">{num}<span /></div><h3>{title}</h3><p>{text}</p>{index < 2 && <div className="step-line" />}</article>)}</div>
    </section>

    <section className="pricing-section section" id="pricing"><Reveal className="pricing-grid gsap-reveal"><div className="pricing-copy"><p className="eyebrow">PRICING</p><h2>Simple plans.<br /><em>Smarter habits.</em></h2></div><div className="pricing-card"><div className="pricing-status">COMING SOON</div><h3>Paisa Coach</h3><p>Subscription details will be announced with launch.</p><div className="price-placeholder"><span>—</span><small>/ month</small></div><div className="price-divider" /><ul><li><ShieldCheck size={16} /> Launch access information pending</li><li><ShieldCheck size={16} /> Premium details to be confirmed</li></ul><button type="button" className="button button-primary" disabled>Join at Launch <ArrowRight size={16} /></button></div></Reveal></section>

    <section className="about-section section" id="about"><Reveal className="about-grid gsap-reveal"><div className="about-mark"><Logo compact /></div><div className="about-copy"><p className="eyebrow">ABOUT PAISA COACH</p><h2>Helping people build a healthier relationship <em>with money.</em></h2><p>We believe financial guidance should feel accessible, thoughtful, and human. Paisa Coach is being built to strengthen financial awareness, encourage discipline, and help people make more informed decisions—one habit at a time.</p></div></Reveal></section>

    <section className="trust-section section" id="privacy"><Reveal className="trust-grid gsap-reveal"><div><p className="eyebrow">TRUST & PRIVACY</p><h2>Your financial information<br /><em>deserves care.</em></h2></div><div className="trust-card"><ShieldCheck size={28} /><h3>Responsibility comes first</h3><p>Privacy and responsible data handling are central to how Paisa Coach is being designed.</p><div className="policy-links"><a href="#privacy">Privacy Policy <ArrowRight size={14} /></a><a href="#terms">Terms and Conditions <ArrowRight size={14} /></a><a href="#deletion">Data Deletion <ArrowRight size={14} /></a><a href="#contact">Contact Support <ArrowRight size={14} /></a></div></div></Reveal></section>

    <section className="download-section" id="download"><div className="download-orb" /><Reveal className="download-content gsap-reveal"><p className="eyebrow">THE APP IS COMING SOON</p><h2>Your financial future deserves<br /><em>a smarter beginning.</em></h2><p>Take the first step towards understanding your money better.</p><div className="store-row"><StoreButton store="play" final /><StoreButton store="app" final /></div></Reveal></section>

    <footer className="footer" id="contact"><div className="footer-main"><div className="footer-brand"><Logo /><p>An AI-powered companion for a healthier relationship with money.</p></div><div className="footer-column"><strong>Explore</strong><a href="#home">Home</a><a href="#features">Features</a><a href="#about">About</a><a href="#pricing">Pricing</a></div><div className="footer-column"><strong>Legal</strong><a href="#privacy">Privacy Policy</a><a href="#terms">Terms and Conditions</a><a href="#deletion">Data Deletion</a></div><div className="footer-column"><strong>Contact</strong><a href="mailto:hello@paisacoach.in">hello@paisacoach.in</a><a href="#download">Download App</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Paisa Coach. All rights reserved.</span><span>Made for your financial future</span></div></footer>
  </main>
}

export default App
