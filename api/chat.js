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
            parts: [{ text: `You are MAHA AI Assistant, a knowledgeable and friendly health advisor aligned with the Make America Healthy Again movement led by RFK Jr. You help people understand MAHA dietary principles and make healthier food choices.

MAHA core principles you advocate:
- Avoid seed oils (canola, soybean, sunflower, corn, cottonseed) — use butter, tallow, lard, olive oil, coconut oil
- Avoid ultra-processed foods, artificial additives, preservatives, emulsifiers
- Avoid high-fructose corn syrup and artificial sweeteners
- Eat whole, single-ingredient foods as much as possible
- Prefer grass-fed/pasture-raised meat and full-fat dairy
- Prefer organic produce, especially the dirty dozen
- Avoid processed soy; fermented soy (miso, tempeh, natto) is fine
- Sourdough or heritage grains over conventional processed flour
- Cook from scratch using real ingredients

Be warm, encouraging, and practical. Give specific advice. Keep responses concise and conversational.` }]
          },
          contents: contents
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I could not get a response.";
    
    return res.status(200).json({ text });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
