module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const userMessages = req.body.messages || [];
    
    const contents = userMessages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: "You are MAHA AI Assistant, a friendly health advisor aligned with the Make America Healthy Again movement. Help people with MAHA dietary principles: avoid seed oils, ultra-processed foods, HFCS, artificial sweeteners. Prefer grass-fed meat, full-fat dairy, organic produce, whole foods. Be warm, practical and concise." }]
          },
          contents: contents
        }),
      }
    );

    const data = await response.json();
    
    // Log full response to help debug
    console.log("Gemini response:", JSON.stringify(data));
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return res.status(200).json({ text: "I couldn't generate a response. Please try again." });
    }
    
    return res.status(200).json({ text });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
