import React, { useState, useRef } from 'react';

function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const refinedPrompt = `The user is currently feeling: '${prompt}'. Respond with either a motivational quote or a Bible verse that best addresses this emotion. Choose the response type based on the intensity and nature of the emotion (e.g., use Bible verses for deeper or spiritual emotions, and motivational quotes for general encouragement). After the quote/verse, include a 1-2 sentence explanation of how this message relates to or helps with the user's current feeling.`;

      const res = await fetch("http://localhost:8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: refinedPrompt })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResponse(data.result);

      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error(err);
      setResponse("Sorry, something went wrong while getting your quote.");
    } finally {
      setLoading(false);
    }
  };

    const extractParts = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const quoteLine = lines.find(line => line.includes('"') && line.includes(' - ')) || '';
    const explanationIndex = lines.indexOf(quoteLine) + 1;
    const explanationLine = lines[explanationIndex] || '';
    return { quote: quoteLine.trim(), explanation: explanationLine.trim() };
  };

  const { quote, explanation } = extractParts(response);


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 to-yellow-900 text-white flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-xl w-full shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-200">QuotesAI ✨</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows="4"
            placeholder="How are you feeling today?"
            className="w-full p-4 rounded-lg text-black focus:ring-2 focus:ring-rose-300"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            {loading ? "Thinking..." : "Inspire Me"}
          </button>
        </form>

        {response && (
          <div
            ref={responseRef}
            className="mt-6 space-y-4 p-4 bg-black bg-opacity-30 rounded-lg animate-fade-in"
          >
            {quote && <p className="text-2xl font-bold italic text-yellow-200 text-center">{quote}</p>}
            {explanation && <p className="text-md text-rose-200 text-center">{explanation}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
