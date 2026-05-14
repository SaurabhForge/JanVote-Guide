import { APP_CONFIG } from "./config";

/**
 * Client-side Gemini utility.
 * Calls the secure server-side API route (/api/voting-faq) instead of
 * hitting the Gemini API directly — keeps the API key server-side only.
 *
 * When deployed on GCP Cloud Run, the base URL resolves to:
 * https://janvote-guide-444951391032.asia-south1.run.app/api/voting-faq
 */

/**
 * Ask the Gemini AI a voting-related question via the secure server route.
 * @param question - The user's question about voting or elections.
 * @returns AI-generated answer string.
 */
export async function askVotingFAQ(question: string): Promise<string> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new Error("Question cannot be empty.");
  }

  // Use the internal API route — works both locally and on GCP
  const apiUrl = APP_CONFIG.FAQ_API_ROUTE;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: trimmed }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
        `Server error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.answer as string;
}

/**
 * Returns the full GCP URL for the voting FAQ API endpoint.
 * Useful for documentation, monitoring, and health checks.
 */
export function getVotingFAQEndpointURL(): string {
  return `${APP_CONFIG.GCP_BASE_URL}${APP_CONFIG.FAQ_API_ROUTE}`;
}
