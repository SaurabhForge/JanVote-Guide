'use client';

import { useState } from 'react';
import styles from './LaunchPadLanding.module.css';

// ── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Features', 'Pricing', 'Missions', 'Fleet'];

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
  },
  {
    name: 'Operator',
    price: '$299',
    sub: 'per month',
    features: ['Up to 25 Satellites', 'Real-time Optimization', 'Full Station Network', 'API Access'],
    cta: 'Begin Mission',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'contact us',
    features: ['Unlimited Fleet Size', 'Dedicated Hardware Downlink', '24/7 Mission Support'],
    cta: 'Contact Us',
    highlight: false,
  },
];

const FOOTER_LINKS = ['Telemetry', 'Flight Deck', 'Protocol', 'Terminal'];

// ── Component ────────────────────────────────────────────────────────────────

export default function LaunchPadLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      {/* ── Navbar ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>
            <span className={styles.logoDot} />
            LAUNCHPAD
          </span>

          {/* Desktop links */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={styles.navLink}>{l}</a>
              </li>
            ))}
          </ul>

          <a href="#pricing" className={styles.navCta}>Get Early Access</a>

          {/* Hamburger */}
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

        {/* Mobile drawer */}
        {menuOpen && (
          <ul className={styles.mobileMenu}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                  {l}
                </a>
              </li>
            ))}
            <li>
              <a href="#pricing" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
                Get Early Access
              </a>
            </li>
          </ul>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero} id="features">
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
          <a href="#pricing" className={styles.btnPrimary}>Get Early Access</a>
          <a href="#features" className={styles.btnGhost}>See Features →</a>
        </div>

        {/* Decorative glow orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </section>

      {/* ── Features ── */}
      <section className={styles.section} id="missions">
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
              <a href="#" className={p.highlight ? styles.btnPrimary : styles.btnOutline}>{p.cta}</a>
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
        <a href="#" className={styles.btnPrimary}>Start Free Trial</a>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.logo}>
          <span className={styles.logoDot} />
          LAUNCHPAD
        </span>
        <ul className={styles.footerLinks}>
          {FOOTER_LINKS.map((l) => (
            <li key={l}><a href="#" className={styles.footerLink}>{l}</a></li>
          ))}
        </ul>
        <p className={styles.copyright}>© 2024 LAUNCHPAD ORBITAL SYSTEMS. ALL TRAJECTORIES RESERVED.</p>
      </footer>
    </div>
  );
}
