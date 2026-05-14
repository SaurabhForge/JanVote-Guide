/**
 * JanVote Guide — App Configuration Constants
 * Central place for all environment-specific URLs and settings.
 */

export const APP_CONFIG = {
  /** GCP Cloud Run deployment URL */
  GCP_BASE_URL: "https://janvote-guide-444951391032.asia-south1.run.app",

  /** Internal API route for the Gemini Voting FAQ */
  FAQ_API_ROUTE: "/api/voting-faq",

  /** External references */
  ECI_PORTAL: "https://voters.eci.gov.in",
  ECI_MAIN: "https://www.eci.gov.in",

  /** App metadata */
  APP_NAME: "JanVote Guide",
  APP_VERSION: "1.0.0",
} as const;

export type AppConfig = typeof APP_CONFIG;
