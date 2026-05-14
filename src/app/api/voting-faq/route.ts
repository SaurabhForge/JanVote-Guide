import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/voting-faq
 *
 * Server-side API route that proxies requests to Google Gemini AI.
 * Keeps the API key secure on the server — never exposed to the client.
 * Deployed on GCP Cloud Run: https://janvote-guide-444951391032.asia-south1.run.app
 */

const SYSTEM_PROMPT = `You are JanVote Assistant, an expert on Indian elections, voter registration, 
and the democratic process in India. You help citizens of India understand:
- How to register as a voter (NVSP, Form 6)
- How to find their polling booth  
- The Election Commission of India (ECI) processes
- Voter ID / EPIC card details
- How to check voter list, voter slip
- Election schedules and phases
- Candidate information and EVMs
- Rights and duties of voters

Always respond in a friendly, helpful, and factual manner. Keep answers concise (2-4 sentences max).
If a question is unrelated to Indian elections or voting, politely redirect to voting topics.
Cite voters.eci.gov.in or eci.gov.in as official sources when relevant.`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(question.trim());
    const response = await result.response;
    const answer = response.text();

    return NextResponse.json(
      { answer },
      {
        status: 200,
        headers: {
          // Allow calls from the GCP-deployed frontend
          "Access-Control-Allow-Origin":
            "https://janvote-guide-444951391032.asia-south1.run.app",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[/api/voting-faq] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while processing your question.",
      },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin":
          "https://janvote-guide-444951391032.asia-south1.run.app",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
