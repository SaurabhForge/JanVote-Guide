import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, CheckCircle } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Election Schedule — JanVote Guide",
  description: "Complete election schedule for Indian elections. Phase-wise dates, results, and key milestones from the Election Commission of India.",
};

const phases = [
  { phase: "Phase 1", date: "April 19, 2024", seats: 102, states: "Tamil Nadu, Rajasthan, UP, Uttarakhand, MP, Bihar (partial)" },
  { phase: "Phase 2", date: "April 26, 2024", seats: 89, states: "Kerala, Karnataka, Rajasthan, UP, MP (partial)" },
  { phase: "Phase 3", date: "May 7, 2024", seats: 94, states: "Gujarat, Karnataka, MP, UP, Bihar, West Bengal (partial)" },
  { phase: "Phase 4", date: "May 13, 2024", seats: 96, states: "Andhra Pradesh, Telangana, Jharkhand, MP, UP (partial)" },
  { phase: "Phase 5", date: "May 20, 2024", seats: 49, states: "Ladakh, UP, Jharkhand, Maharashtra, Odisha (partial)" },
  { phase: "Phase 6", date: "May 25, 2024", seats: 58, states: "Delhi, Haryana, Jharkhand, UP, West Bengal (partial)" },
  { phase: "Phase 7", date: "June 1, 2024", seats: 57, states: "Punjab, HP, UP, West Bengal, Bihar, Odisha (partial)" },
];

const milestones = [
  { event: "Model Code of Conduct Activated", date: "March 16, 2024", done: true },
  { event: "Phase 1 Polling", date: "April 19, 2024", done: true },
  { event: "Phase 7 Polling (Final Phase)", date: "June 1, 2024", done: true },
  { event: "Vote Counting Day", date: "June 4, 2024", done: true },
  { event: "Results Announced", date: "June 4, 2024", done: true },
  { event: "New Government Formation", date: "June 2024", done: true },
];

const keyFacts = [
  { label: "Total Lok Sabha Seats", value: "543" },
  { label: "Total Phases", value: "7" },
  { label: "Polling Duration", value: "47 Days" },
  { label: "Eligible Voters (2024)", value: "97 Crore+" },
  { label: "First-Time Voters", value: "1.8 Crore+" },
  { label: "Women Voters", value: "47 Crore+" },
];

export default function ElectionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">General Elections 2024</span>
          <h1>Election <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Schedule</span></h1>
          <p style={{ maxWidth: 580, margin: "16px auto 32px", fontSize: "1.1rem" }}>
            India&apos;s 18th General Election — the world&apos;s largest democratic exercise — was held across 7 phases. Here&apos;s the complete schedule and key dates.
          </p>
          <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="election-eci-btn">
            Visit ECI Website <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Key Facts */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">At a Glance</p>
          <h2 className="section-title">2024 Election <span>Key Facts</span></h2>
          <div className={styles.factsGrid}>
            {keyFacts.map((f) => (
              <div className={`glass-card ${styles.factCard}`} key={f.label}>
                <div className={styles.factValue}>{f.value}</div>
                <div className={styles.factLabel}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase-wise Schedule */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Phase-Wise Dates</p>
          <h2 className="section-title">7-Phase <span>Polling Schedule</span></h2>
          <div className={styles.phaseTable}>
            <div className={styles.phaseHeader}>
              <span>Phase</span><span>Polling Date</span><span>Seats</span><span>Key States</span>
            </div>
            {phases.map((p, i) => (
              <div className={`${styles.phaseRow} ${i % 2 === 0 ? styles.phaseRowAlt : ""}`} key={p.phase} id={`phase-${i + 1}`}>
                <span className={styles.phaseTag}>{p.phase}</span>
                <span className={styles.phaseDate}><Clock size={14} />{p.date}</span>
                <span className={styles.phaseSeats}>{p.seats} seats</span>
                <span className={styles.phaseStates}>{p.states}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <p className="section-eyebrow">Key Milestones</p>
          <h2 className="section-title">Election <span>Timeline</span></h2>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div className={styles.milestoneItem} key={i} id={`milestone-${i}`}>
                <div className={`${styles.milestoneDot} ${m.done ? styles.done : ""}`}>
                  {m.done && <CheckCircle size={16} />}
                </div>
                <div className={`glass-card ${styles.milestoneCard}`}>
                  <p className={styles.milestoneDate}><Calendar size={14} />{m.date}</p>
                  <h4>{m.event}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: "center" }}>
        <div className="container">
          <p style={{ marginBottom: 24, color: "var(--text-secondary)" }}>Want to know your candidates before the next election?</p>
          <Link href="/candidates" className="btn btn-primary" id="election-candidates-btn">
            Know Your Candidates <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
