module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: `You are MAHA AI Assistant, a knowledgeable and friendly health advisor aligned with the Make America Healthy Again movement led by RFK Jr. You help people understand MAHA dietary principles and make healthier food choices.

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

Be warm, encouraging, and practical. Give specific advice. If someone shares a recipe or food, evaluate it and suggest MAHA-friendly swaps. Keep responses concise and conversational.`,
        messages: req.body.messages,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
