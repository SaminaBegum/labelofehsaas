const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await fetch("https://api.openai.com/v1/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/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Server error occurred",
    });
  }
});

exports.api = functions.https.onRequest(app);