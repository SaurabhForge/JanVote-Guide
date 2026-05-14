import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, Smartphone, Globe, ArrowRight, Phone } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Find Your Polling Booth — JanVote Guide",
  description: "Find your assigned polling booth using your Voter ID or name. Links to the official ECI voter portal.",
};

const methods = [
  {
    icon: Globe, title: "Online via ECI Portal", color: "saffron",
    steps: ["Visit voters.eci.gov.in", "Click 'Search Your Name in Voter List'", "Enter EPIC number OR name + state + district", "Your polling station details will appear"],
    link: "https://voters.eci.gov.in", linkLabel: "Go to ECI Portal",
  },
  {
    icon: Smartphone, title: "Voter Helpline App", color: "green",
    steps: ["Download 'Voter Helpline' from Play Store / App Store", "Search by EPIC number or name", "View polling station on an in-app map", "Get directions directly from the app"],
    link: "https://play.google.com/store/apps/details?id=com.eci.citizen", linkLabel: "Download App",
  },
  {
    icon: Phone, title: "National Helpline: 1950", color: "blue",
    steps: ["Call the ECI toll-free number: 1950", "Available in multiple regional languages", "Provide your name and district", "Get your polling booth details instantly"],
    link: "tel:1950", linkLabel: "Call 1950",
  },
];

const tips = [
  "Visit your booth at least once before polling day so you know the route.",
  "Polling hours are 7:00 AM to 6:00 PM. Go early to avoid queues.",
  "Differently-abled voters can request a wheelchair or priority queue.",
  "Senior citizens (80+) can apply for postal ballots to vote from home.",
  "If you've shifted recently, update your voter registration address.",
  "Carry your phone to navigate to the booth on polling day.",
];

export default function FindBoothPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Locate Your Booth</span>
          <h1>Find Your <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Polling Booth</span></h1>
          <p style={{ maxWidth: 580, margin: "16px auto 32px", fontSize: "1.1rem" }}>
            Your polling booth is assigned based on your registered address. Use any of the three methods below to find yours in under 2 minutes.
          </p>
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="find-booth-portal-btn">
            Search on ECI Portal <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">3 Ways to Find It</p>
          <h2 className="section-title">Choose Your <span>Search Method</span></h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {methods.map((m) => {
              const Icon = m.icon;
              return (
                <div className={`glass-card ${styles.methodCard}`} key={m.title}>
                  <div className={`icon-box icon-box-${m.color}`} style={{ marginBottom: 20 }}><Icon size={22} /></div>
                  <h3>{m.title}</h3>
                  <ol className={styles.methodSteps}>
                    {m.steps.map((s, i) => <li key={i}><span>{i + 1}</span>{s}</li>)}
                  </ol>
                  <a href={m.link} target={m.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: 20, fontSize: "0.85rem" }}>
                    {m.linkLabel} <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`section ${styles.searchSection}`}>
        <div className="container">
          <div className={styles.searchBox}>
            <div className={styles.searchIcon}><Search size={32} /></div>
            <h2>Search Directly on the ECI Voter Portal</h2>
            <p>The official Election Commission portal lets you search by EPIC number, mobile number, or name — the most accurate and up-to-date source.</p>
            <div className={styles.searchBtns}>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="search-eci-btn">
                Open ECI Voter Portal <ArrowRight size={18} />
              </a>
              <a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline" id="search-electoral-btn">
                Electoral Search <MapPin size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Pro Tips</p>
          <h2 className="section-title">Booth Day <span>Checklist</span></h2>
          <div className={styles.tipsGrid}>
            {tips.map((tip, i) => (
              <div className={`glass-card ${styles.tipCard}`} key={i} id={`tip-${i}`}>
                <div className={styles.tipNum}>{i + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
