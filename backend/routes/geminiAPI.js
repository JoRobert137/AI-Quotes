const express = require('express');
require('dotenv').config();

const router = express.Router();
const API_KEY = process.env.VITE_GEMINI_API_KEY;

// Handle POST request to /api/gemini
router.post("/", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided." });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // Log the full response once for debugging
    console.log("Raw Gemini API response:", JSON.stringify(data, null, 2));

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      return res.status(500).json({ error: "AI did not return a usable response." });
    }

    res.json({ result });
  } catch (err) {
    console.error("Error from Gemini fetch:", err);
    res.status(500).json({ error: "Failed to fetch from Gemini API" });
  }
});

module.exports = router;