import type { Metadata } from "next";

import styles from "./faq.module.css";

import VotingFAQAssistant from "@/components/VotingFAQAssistant";

export const metadata: Metadata = {
  title: "FAQ — JanVote Guide",
  description:
    "Get answers to frequently asked questions about voter registration, polling booths, and elections in India. Ask our AI assistant for instant help.",
};

const faqs = [
  {
    q: "Who is eligible to vote in India?",
    a: "Any Indian citizen who is 18 years of age or older as of January 1 of the qualifying year, and is ordinarily resident in a constituency, is eligible to be registered as a voter.",
  },
  {
    q: "How do I register as a voter?",
    a: "Visit voters.eci.gov.in and fill out Form 6 online. You will need proof of age, proof of address, and a passport-size photograph. Your name will be added to the Electoral Roll.",
  },
  {
    q: "What is an EPIC card?",
    a: "EPIC stands for Elector's Photo Identity Card — commonly called the Voter ID card. It is issued by the Election Commission of India and serves as both a voter identification document and a general-purpose government ID.",
  },
  {
    q: "Can I vote without a Voter ID card?",
    a: "Yes. The ECI allows 12 alternative photo IDs including Aadhaar, Passport, Driving Licence, PAN card, and MNREGA Job Card. Your name must appear on the electoral roll.",
  },
  {
    q: "How do I find my polling booth?",
    a: "Go to voters.eci.gov.in, click 'Know Your Polling Station', and enter your EPIC number or personal details. The exact address and room number of your polling booth will be displayed.",
  },
  {
    q: "What is the last date to register before an election?",
    a: "The cutoff is typically 30 days before the announcement of the election schedule. Check the Election Commission of India website for specific dates for upcoming elections.",
  },
  {
    q: "How do I update my address on the voter list?",
    a: "Submit Form 8A online at voters.eci.gov.in if you have moved within the same constituency. For a different constituency, submit Form 6 for the new constituency and Form 7 to delete the old entry.",
  },
  {
    q: "What is the Model Code of Conduct?",
    a: "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates during election campaigns. It comes into force with the announcement of the election schedule and remains until results are declared.",
  },
];

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="FAQ page introduction">
        <div className="container">
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroSub}>
            Everything you need to know about voting in India — answered clearly and quickly.
          </p>
        </div>
      </section>

      <div className="container">
        <div className={styles.layout}>
          {/* Static FAQ accordion */}
          <main id="main-content" className={styles.faqMain}>
            <h2 className={styles.sectionTitle}>Common Questions</h2>
            <dl className={styles.faqList}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </dl>
          </main>

          {/* Gemini AI Assistant sidebar */}
          <aside className={styles.sidebar} aria-label="AI Voting Assistant sidebar">
            <VotingFAQAssistant />
            <p className={styles.disclaimer}>
              * AI answers are for guidance only. Always verify with{" "}
              <a
                href="https://voters.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit official Election Commission of India voter portal (opens in new tab)"
              >
                voters.eci.gov.in
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const id = `faq-${index}`;
  return (
    <div className={styles.faqItem}>
      <dt>
        <h3 id={id} className={styles.faqQuestion}>
          {question}
        </h3>
      </dt>
      <dd className={styles.faqAnswer} aria-labelledby={id}>
        {answer}
      </dd>
    </div>
  );
}
