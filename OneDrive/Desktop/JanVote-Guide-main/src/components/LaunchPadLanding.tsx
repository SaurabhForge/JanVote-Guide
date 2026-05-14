'use client';

import { useState, useEffect } from 'react';
import styles from './LaunchPadLanding.module.css';

// ── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Missions', id: 'missions' },
  { label: 'Fleet', id: 'fleet' },
];

const FEATURES = [
  {
    icon: '📡',
    title: 'Real-time Telemetry',
    desc: 'Stream micro-second accurate data from your entire constellation directly to your command center.',
  },
  {
    icon: '🛸',
    title: 'Orbital Optimization',
    desc: 'AI-driven trajectory planning to maximize fuel efficiency and extend satellite operational lifespans.',
  },
  {
    icon: '🌐',
    title: 'Global Network',
    desc: 'Connect to our proprietary ground station network spanning 42 locations worldwide for zero-latency downlink.',
  },
];

const PLANS = [
  {
    name: 'Explorer',
    price: '$0',
    sub: 'Free forever',
    features: ['Up to 3 Satellites', 'Basic Telemetry', '10 Ground Stations'],
    cta: 'Start Free',
    highlight: false,
    type: 'free',
  },
  {
    name: 'Operator',
    price: '$299',
    sub: 'per month',
    features: ['Up to 25 Satellites', 'Real-time Optimization', 'Full Station Network', 'API Access'],
    cta: 'Begin Mission',
    highlight: true,
    type: 'paid',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'contact us',
    features: ['Unlimited Fleet Size', 'Dedicated Hardware Downlink', '24/7 Mission Support'],
    cta: 'Contact Us',
    highlight: false,
    type: 'enterprise',
  },
];

const FOOTER_LINKS = ['Telemetry', 'Flight Deck', 'Protocol', 'Terminal'];

// ── Smooth scroll helper ────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Modal types ─────────────────────────────────────────────────────────────
type ModalType = 'earlyAccess' | 'payment' | 'contact' | null;

interface SelectedPlan {
  name: string;
  price: string;
}

// ── Success screen config ────────────────────────────────────────────────────
const SUCCESS: Record<string, { icon: string; title: string; msg: string }> = {
  earlyAccess: {
    icon: '🎉',
    title: "You're on the list!",
    msg: "We've reserved your spot on the Explorer plan. Expect a launch invite in your inbox within 48 hours.",
  },
  payment: {
    icon: '✅',
    title: 'Mission Initiated!',
    msg: "Payment successful. Your Operator plan is now active. Check your email for onboarding instructions.",
  },
  contact: {
    icon: '📡',
    title: 'Transmission Received!',
    msg: 'Our enterprise team will prepare a custom proposal and reach out within 24 hours.',
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function LaunchPadLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null); // key into SUCCESS map
  const [cardNumber, setCardNumber] = useState('');

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function closeModal() {
    setModal(null);
    setSuccess(null);
    setLoading(false);
    setCardNumber('');
  }

  function openPlanModal(plan: typeof PLANS[0]) {
    setSelectedPlan({ name: plan.name, price: plan.price });
    setSuccess(null);
    setLoading(false);
    if (plan.type === 'free') setModal('earlyAccess');
    else if (plan.type === 'paid') setModal('payment');
    else setModal('contact');
  }

  function handleSubmit(type: string) {
    return (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Simulate async processing (1.5s)
      setTimeout(() => {
        setLoading(false);
        setSuccess(type);
      }, 1500);
    };
  }

  // Auto-format card number: groups of 4 digits
  function formatCardNumber(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  return (
    <div className={styles.root}>

      {/* ── Navbar ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>
            <span className={styles.logoDot} />
            LAUNCHPAD
          </span>

          <ul className={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollTo(l.id)} className={styles.navLink}>{l.label}</button>
              </li>
            ))}
          </ul>

          <button onClick={() => setModal('earlyAccess')} className={styles.navCta}>Get Early Access</button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.barTop : styles.bar} />
            <span className={menuOpen ? styles.barMid : styles.bar} />
            <span className={menuOpen ? styles.barBot : styles.bar} />
          </button>
        </div>

        {menuOpen && (
          <ul className={styles.mobileMenu}>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  className={styles.mobileLink}
                  onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button className={styles.mobileCta} onClick={() => { setModal('earlyAccess'); setMenuOpen(false); }}>
                Get Early Access
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBadge}>
          <span className={styles.beaconDot} />
          Now in Public Beta
        </div>
        <h1 className={styles.heroHeadline}>
          Launch Your<br />
          <span className={styles.gradientText}>Ambitions into Orbit</span>
        </h1>
        <p className={styles.heroSub}>
          The definitive orbital management software for the next generation of space enterprises.
          Track, optimize, and scale your satellite constellations with aerospace-grade precision.
        </p>
        <div className={styles.heroCtas}>
          <button onClick={() => setModal('earlyAccess')} className={styles.btnPrimary}>Get Early Access</button>
          <button onClick={() => scrollTo('features')} className={styles.btnGhost}>See Features →</button>
        </div>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </section>

      {/* ── Features ── */}
      <section className={styles.section} id="features">
        <p className={styles.sectionLabel}>ORBITAL DOMAIN SUPERIORITY</p>
        <h2 className={styles.sectionTitle}>
          Propel your operations forward with tools designed for the complexities of modern spaceflight.
        </h2>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Missions stat band ── */}
      <section className={styles.statBand} id="missions">
        <div className={styles.statItem}><span className={styles.statNum}>400+</span><span className={styles.statLabel}>Companies</span></div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}><span className={styles.statNum}>42</span><span className={styles.statLabel}>Ground Stations</span></div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}><span className={styles.statNum}>99.9%</span><span className={styles.statLabel}>Uptime SLA</span></div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}><span className={styles.statNum}>{'<1ms'}</span><span className={styles.statLabel}>Latency</span></div>
      </section>

      {/* ── Pricing ── */}
      <section className={styles.section} id="pricing">
        <p className={styles.sectionLabel}>FLEET PRICING</p>
        <h2 className={styles.sectionTitle}>Scalable solutions for startups to global aerospace conglomerates.</h2>
        <div className={styles.pricingGrid}>
          {PLANS.map((p) => (
            <div key={p.name} className={p.highlight ? styles.pricingCardHL : styles.pricingCard}>
              {p.highlight && <span className={styles.popularBadge}>Most Popular</span>}
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.planPrice}>{p.price}</div>
              <div className={styles.planSub}>{p.sub}</div>
              <ul className={styles.planFeatures}>
                {p.features.map((feat) => (
                  <li key={feat} className={styles.planFeature}>
                    <span className={styles.checkIcon}>✓</span> {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openPlanModal(p)}
                className={p.highlight ? styles.btnPrimary : styles.btnOutline}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner} id="fleet">
        <div className={styles.ctaBannerOrb} />
        <h2 className={styles.ctaTitle}>Ready for Liftoff?</h2>
        <p className={styles.ctaDesc}>
          Join over 400 space tech companies managing their orbital assets with LaunchPad.
          Start your trial today and reach the stars tomorrow.
        </p>
        <button onClick={() => setModal('earlyAccess')} className={styles.btnPrimary}>Start Free Trial</button>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.logo}>
          <span className={styles.logoDot} />
          LAUNCHPAD
        </span>
        <ul className={styles.footerLinks}>
          {FOOTER_LINKS.map((l) => (
            <li key={l}><button onClick={() => scrollTo('features')} className={styles.footerLink}>{l}</button></li>
          ))}
        </ul>
        <p className={styles.copyright}>© 2024 LAUNCHPAD ORBITAL SYSTEMS. ALL TRAJECTORIES RESERVED.</p>
      </footer>

      {/* ════════════════ MODALS ════════════════ */}

      {/* Backdrop */}
      {modal && (
        <div className={styles.backdrop} onClick={closeModal} aria-hidden="true" />
      )}

      {/* ── Early Access / Free Signup Modal ── */}
      {/* ── Shared success screen ── */}
      {modal && success && SUCCESS[success] && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <button className={styles.modalClose} onClick={closeModal} aria-label="Close">✕</button>
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>{SUCCESS[success].icon}</div>
            <h2 className={styles.modalTitle}>{SUCCESS[success].title}</h2>
            <p className={styles.modalSub}>{SUCCESS[success].msg}</p>
            <button onClick={closeModal} className={styles.btnPrimary} style={{ marginTop: '8px' }}>Close</button>
          </div>
        </div>
      )}

      {/* ── Early Access Modal ── */}
      {modal === 'earlyAccess' && !success && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="ea-title">
          <button className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close">✕</button>
          <div className={styles.modalIcon}>🚀</div>
          <h2 id="ea-title" className={styles.modalTitle}>Get Early Access</h2>
          <p className={styles.modalSub}>Join the waitlist for LaunchPad — free forever on the Explorer plan.</p>
          <form className={styles.form} onSubmit={handleSubmit('earlyAccess')}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Full Name</label>
              <input required type="text" placeholder="Jane Orbital" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Work Email</label>
              <input required type="email" placeholder="jane@spacetech.io" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Company</label>
              <input type="text" placeholder="Stellar Dynamics Inc." className={styles.input} />
            </div>
            <button type="submit" disabled={loading} className={styles.btnPrimary} style={{ width: '100%', marginTop: '8px' }}>
              {loading ? <span className={styles.spinner} /> : 'Join the Waitlist →'}
            </button>
          </form>
        </div>
      )}

      {/* ── Payment Modal ── */}
      {modal === 'payment' && !success && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="pay-title">
          <button className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close">✕</button>
          <div className={styles.modalIcon}>💳</div>
          <h2 id="pay-title" className={styles.modalTitle}>
            {selectedPlan?.name} Plan — {selectedPlan?.price}<span className={styles.modalPriceSub}>/mo</span>
          </h2>
          <p className={styles.modalSub}>Secure checkout. Cancel anytime. No hidden fees.</p>
          <form className={styles.form} onSubmit={handleSubmit('payment')}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Cardholder Name</label>
              <input required type="text" placeholder="Jane Orbital" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Card Number</label>
              <input
                required
                type="text"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className={styles.input}
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Expiry</label>
                <input required type="text" placeholder="MM / YY" maxLength={7} className={styles.input} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>CVC</label>
                <input required type="text" placeholder="123" maxLength={4} className={styles.input} />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Email for Receipt</label>
              <input required type="email" placeholder="jane@spacetech.io" className={styles.input} />
            </div>
            <div className={styles.payTotal}>
              <span>Total today</span>
              <span className={styles.payAmount}>{selectedPlan?.price} / month</span>
            </div>
            <button type="submit" disabled={loading} className={styles.btnPrimary} style={{ width: '100%' }}>
              {loading ? <span className={styles.spinner} /> : `🔒 Pay ${selectedPlan?.price} & Launch Mission`}
            </button>
          </form>
        </div>
      )}

      {/* ── Contact / Enterprise Modal ── */}
      {modal === 'contact' && !success && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button className={styles.modalClose} onClick={() => setModal(null)} aria-label="Close">✕</button>
          <div className={styles.modalIcon}>🛰️</div>
          <h2 id="contact-title" className={styles.modalTitle}>Enterprise Inquiry</h2>
          <p className={styles.modalSub}>Tell us about your fleet. Our team will prepare a custom proposal within 24 hours.</p>
          <form className={styles.form} onSubmit={handleSubmit('contact')}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Full Name</label>
              <input required type="text" placeholder="Jane Orbital" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Work Email</label>
              <input required type="email" placeholder="jane@spacetech.io" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Company Name</label>
              <input required type="text" placeholder="Stellar Dynamics Inc." className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Fleet Size (# of satellites)</label>
              <input type="number" placeholder="e.g. 150" min="1" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea placeholder="Tell us about your mission requirements..." className={styles.textarea} rows={3} />
            </div>
            <button type="submit" disabled={loading} className={styles.btnPrimary} style={{ width: '100%' }}>
              {loading ? <span className={styles.spinner} /> : 'Send Transmission →'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
