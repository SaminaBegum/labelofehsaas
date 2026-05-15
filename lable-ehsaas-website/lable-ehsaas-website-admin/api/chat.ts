import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ reply: "Invalid request" });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a fashion shopping assistant. Keep replies short, stylish, and helpful.",
            },
            ...messages,
          ],
        }),
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", errText);
      return res.status(500).json({ reply: "AI service error" });
    }

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ reply: "Server error" });
  }
}