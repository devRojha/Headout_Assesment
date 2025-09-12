// unifiedPostParser.js
import OpenAI from "openai";

/**
 * parseUnifiedPost
 * - text: the single-textbox input from the user (string)
 * - attachmentText: optional extracted text from an attached image/PDF (string|null)
 *
 * Returns:
 * {
 *   intent: "announcement" | "event" | "lost_and_found" | "other",
 *   confidence: number (0-1),
 *   payload: object | null  // The JSON matching one of your schemas (fields as specified)
 * }
 *
 * NOTE: ensure process.env.OPENAI_API_KEY is set.
 */
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseUnifiedPost({ text, attachmentText = null }) {
  if (!text || typeof text !== "string") {
    throw new Error("`text` (string) is required");
  }

  // Compose instruction / context for the model
  const systemPrompt = `
You are an assistant integrated into a campus community app. Users create posts with a single free-text box and optionally attach an image/PDF. Your job is to:
1) Detect the user's intent: one of "announcement", "event", "lost_and_found", or "other".
2) Extract structured fields matching the exact schemas below for the detected intent.
3) Return EXACTLY a JSON object (no extra text) with the following top-level shape:
{
  "intent": "announcement" | "event" | "lost_and_found" | "other",
  "confidence": 0.00-1.00,
  "payload": { ... }   // fields depend on intent; if intent is 'other', payload is null
}

Rules:
- Output only JSON, nothing else.
- If a field is unknown, set it to null (or an empty list for arrays).
- Dates must be ISO 8601 format (e.g., 2025-09-12T12:00:00Z) when present.
- Try to extract contact info (email or phone) if present.
- Include a short editable_preview inside payload for the recruiter UI: a small object with human-friendly editable fields (title, short_description, date_text, location_text).
- Provide a confidence score (0-1) representing your certainty about the classification and extracted fields.

Schemas (exact field names expected):

1) Announcement (intent == "announcement")
{
  "department": string | null,        // e.g., "CSE", "Mechanical", etc.
  "message": string | null,
  "date": string | null,              // ISO 8601 (date of posting or event date if mentioned)
  "resourceLink": string | null,
  "editable_preview": { "title": string|null, "short_description": string|null }
}

2) Event (intent == "event")
{
  "title": string | null,
  "description": string | null,
  "date": string | null,           // ISO 8601 (event date & time if available)
  "location": string | null,
  "imageUrl": string | null,
  "editable_preview": { "title": string|null, "short_description": string|null, "date_text": string|null, "location_text": string|null }
}

3) Lost & Found (intent == "lost_and_found")
{
  "type": "lost" | "found" | null,
  "itemName": string | null,
  "location": string | null,
  "imageUrl": string | null,
  "contactInfo": string | null,
  "dateReported": string | null,    // ISO 8601 or null
  "editable_preview": { "title": string|null, "short_description": string|null }
}

If you cannot confidently map the input to any of the three categories, set intent to "other" and payload to null.
`;

  // The user message contains the raw text and any extracted attachment text
  const userPrompt = `
User text:
"""${text}"""

${attachmentText ? `Attachment (OCR/extracted text):\n"""${attachmentText}"""` : ""}
  
Please produce the JSON now.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.0,
      max_tokens: 800,
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) throw new Error("No content returned from OpenAI");

    // The model should return raw JSON only. Try to parse it.
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (jsonErr) {
      // Attempt to salvage JSON if model included backticks or explanation
      // Try to extract the first {...} block
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse JSON from model output: " + raw);
      }
    }

    // Basic validation & normalization
    const result = {
      intent: parsed.intent ?? "other",
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 1.0,
      payload: parsed.payload ?? null,
    };

    // Convert any ISO date strings to Date objects where appropriate
    const convertISO = (s) => {
      try {
        if (!s) return null;
        const d = new Date(s);
        if (isNaN(d.getTime())) return null;
        return d;
      } catch {
        return null;
      }
    };

    if (result.intent === "announcement" && result.payload) {
      if (result.payload.date) result.payload.date = convertISO(result.payload.date) || result.payload.date;
    }
    if (result.intent === "event" && result.payload) {
      if (result.payload.date) result.payload.date = convertISO(result.payload.date) || result.payload.date;
    }
    if (result.intent === "lost_and_found" && result.payload) {
      if (result.payload.dateReported) result.payload.dateReported = convertISO(result.payload.dateReported) || result.payload.dateReported;
    }

    return result;
  } catch (err) {
    // Bubble up or handle logging + return safe fallback
    console.error("Error parsing unified post:", err);
    throw err;
  }
}