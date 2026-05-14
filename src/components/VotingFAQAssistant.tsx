"use client";

import { useState, useRef, useEffect } from "react";
import { askVotingFAQ } from "@/lib/gemini";
import styles from "./VotingFAQAssistant.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I register to vote in India?",
  "Where can I find my polling booth?",
  "What documents do I need for voter registration?",
  "How do I check if my name is on the voter list?",
];

export default function VotingFAQAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm JanVote Assistant, powered by Google Gemini AI. Ask me anything about voter registration, elections, or your voting rights in India. 🗳️",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsLoading(true);

    try {
      const answer = await askVotingFAQ(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I couldn't process your question right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(input);
  };

  return (
    <section className={styles.container} aria-label="Voting FAQ AI Assistant">
      <div className={styles.header}>
        <div className={styles.headerIcon} aria-hidden="true">✨</div>
        <div>
          <h2 className={styles.title}>AI Voting Assistant</h2>
          <p className={styles.subtitle}>Powered by Google Gemini</p>
        </div>
        <span className={styles.badge} aria-label="AI-powered feature">AI</span>
      </div>

      {/* Chat messages */}
      <div
        className={styles.messages}
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.role === "user" ? styles.userMessage : styles.assistantMessage
            }`}
            aria-label={`${msg.role === "user" ? "You" : "Assistant"}: ${msg.content}`}
          >
            {msg.role === "assistant" && (
              <span className={styles.avatar} aria-hidden="true">🗳️</span>
            )}
            <p className={styles.messageText}>{msg.content}</p>
          </div>
        ))}

        {isLoading && (
          <div
            className={`${styles.message} ${styles.assistantMessage}`}
            aria-label="Assistant is thinking"
          >
            <span className={styles.avatar} aria-hidden="true">🗳️</span>
            <div className={styles.typingIndicator} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className={styles.error} role="alert" aria-live="assertive">
          ⚠️ {error}
        </div>
      )}

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div className={styles.suggestions} aria-label="Suggested questions">
          <p className={styles.suggestionsLabel}>Try asking:</p>
          <div className={styles.suggestionsGrid}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                className={styles.suggestionBtn}
                onClick={() => handleSubmit(q)}
                aria-label={`Ask: ${q}`}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form
        className={styles.inputForm}
        onSubmit={handleFormSubmit}
        aria-label="Ask a voting question"
      >
        <label htmlFor="faq-input" className={styles.srOnly}>
          Ask a question about voting
        </label>
        <input
          id="faq-input"
          ref={inputRef}
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about voter registration, elections..."
          aria-label="Type your voting question here"
          disabled={isLoading}
          maxLength={500}
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading || !input.trim()}
          aria-label="Send question to AI assistant"
        >
          {isLoading ? (
            <span aria-hidden="true">⏳</span>
          ) : (
            <span aria-hidden="true">➤</span>
          )}
        </button>
      </form>
    </section>
  );
}
