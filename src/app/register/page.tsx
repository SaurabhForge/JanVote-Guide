import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, FileText, Globe, Smartphone, Clock, AlertCircle, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Voter Registration Guide — JanVote Guide",
  description: "Complete step-by-step guide to register as a voter in India. Learn eligibility, documents required, and how to register online via NVSP or Form 6.",
};

const steps = [
  { num: 1, title: "Check Eligibility", desc: "You must be an Indian citizen, at least 18 years old on January 1st of the qualifying year, and ordinarily resident at your address.", icon: CheckCircle },
  { num: 2, title: "Gather Documents", desc: "Keep ready: Proof of Age (Aadhaar / Birth Certificate / Passport), Proof of Address (Aadhaar / Utility Bill / Bank Statement), and a recent passport-size photo.", icon: FileText },
  { num: 3, title: "Visit NVSP Portal or App", desc: "Go to voters.eci.gov.in or download the 'Voter Helpline' app. You can also visit your nearest BLO (Booth Level Officer) for offline registration.", icon: Globe },
  { num: 4, title: "Fill Form 6", desc: "Form 6 is the application for inclusion of name in electoral roll. Fill in your personal details, address, and upload required documents.", icon: FileText },
  { num: 5, title: "Submit & Get Reference No.", desc: "Submit your form online. You'll receive a reference number via SMS/email to track your application status.", icon: Smartphone },
  { num: 6, title: "Verification & Approval", desc: "The BLO will verify your details (may do a home visit). Your name will be added to the electoral roll — you'll receive your Voter ID (EPIC) within 30–45 days.", icon: Clock },
];

const docs = [
  "Aadhaar Card (most common — serves as both age and address proof)",
  "Birth Certificate / School Certificate (for age proof)",
  "Passport / Driving Licence / PAN Card",
  "Electricity / Water / Gas Bill (for address proof)",
  "Bank / Post Office Passbook with photo",
  "Recent Passport-Size Photograph",
];

const faqs = [
  { q: "Can I register if I don't have Aadhaar?", a: "Yes. Aadhaar is not mandatory. Any valid age and address proof listed by ECI will work." },
  { q: "What if I moved to a new city?", a: "Fill Form 8A for shifting of residence within the same constituency, or Form 6 for a new constituency." },
  { q: "Can NRI Indians register?", a: "Yes. NRI voters can register using Form 6A on the NVSP portal with their valid Indian passport." },
  { q: "Is there a deadline for registration?", a: "There are 4 qualifying dates per year: Jan 1, Apr 1, Jul 1, and Oct 1. You must be 18 by these dates." },
];

export default function RegisterPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Step 1 of Your Vote</span>
          <h1>Voter <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Registration</span> Guide</h1>
          <p style={{ maxWidth: 600, margin: "16px auto 32px", fontSize: "1.1rem" }}>
            Registering to vote is the first step in exercising your democratic right. The process takes under 10 minutes online — here&apos;s everything you need.
          </p>
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="register-nvsp-btn">
            Register on NVSP <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Registration Process</p>
          <h2 className="section-title">6 Simple <span>Steps</span> to Register</h2>
          <div className={styles.stepsGrid}>
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div className={`glass-card ${styles.stepCard}`} key={step.num} id={`step-${step.num}`}>
                  <div className={styles.stepTop}>
                    <div className="step-number">{step.num}</div>
                    <div className={`icon-box icon-box-saffron`}><Icon size={20} /></div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className={`section ${styles.docsSection}`}>
        <div className="container">
          <div className={styles.docsGrid}>
            <div>
              <p className="section-eyebrow">Documents Required</p>
              <h2 className="section-title">What to <span>Keep Ready</span></h2>
              <p>You need one document each for age proof and address proof. Aadhaar Card alone usually suffices for both.</p>
              <ul className={styles.docList}>
                {docs.map((d) => (
                  <li key={d}>
                    <CheckCircle size={18} color="var(--saffron)" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.alertBox}>
              <div className={`icon-box icon-box-saffron`} style={{ marginBottom: 20 }}><AlertCircle size={22} /></div>
              <h3>Important Notes</h3>
              <ul className={styles.alertList}>
                <li>Register at your <strong>permanent address</strong>, not a temporary/rented one unless you live there regularly.</li>
                <li>You can only be registered in <strong>one constituency</strong>. Duplicate registration is a criminal offense.</li>
                <li>Track your application status on <strong>voters.eci.gov.in</strong> using your reference number.</li>
                <li>Your name in the voter roll must match your official ID documents exactly.</li>
              </ul>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 24, fontSize: "0.9rem" }}>
                Go to Voter Portal <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Common Questions</p>
          <h2 className="section-title">Registration <span>FAQs</span></h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <div className={`glass-card ${styles.faqCard}`} key={faq.q}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/faq" className="btn btn-outline" id="register-more-faq-btn">View All FAQs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
