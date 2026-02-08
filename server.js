import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));


    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini did not return text.";

    res.json({ text });
  } catch (error) {
    res.json({ text: "Server error occurred." });
  }
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
