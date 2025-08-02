import { useState } from "react";
import { getGeminiResponse } from "./services/geminiAPI";

function App() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `Based on the following user emotion or feeling: "${userInput}", give either a motivational quote or a Bible verse with a short explanation.`;
    const response = await getGeminiResponse(prompt);
    setAiResponse(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-xl w-full shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">InspoBot ✨</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows="4"
            placeholder="How are you feeling today?"
            className="w-full p-4 rounded-lg text-black focus:ring-2 focus:ring-indigo-300"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            {loading ? "Thinking..." : "Inspire Me"}
          </button>
        </form>
        {aiResponse && (
          <div className="mt-6 p-4 bg-black bg-opacity-20 rounded-lg whitespace-pre-line">
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
