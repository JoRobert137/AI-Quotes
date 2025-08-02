const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getGeminiResponse(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
}
