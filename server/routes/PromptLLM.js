

const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.MY_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/clubselection", async (req, res) => {
  const { prompt } = req.body;

  try {
    const chat = model.startChat({
      history: [],
      generationConfig: { maxOutputTokens: 100 },
    });

    const result = await chat.sendMessageStream(prompt);
    let responseText = "";

   
    for await (const chunk of result.stream) {
      responseText += chunk.text(); 
    }

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error in clubSelectionAI:", error);
    res.status(500).json({ error: "Failed to generate club selection." });
  }
});

router.post("/generate-response", async (req, res) => {
  const { prompt, conversationHistory } = req.body;

  try {
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessageStream(prompt);
    let responseText = "";

    for await (const chunk of result.stream) {
      responseText += chunk.text();
    }

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error in generateAIResponse:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

module.exports = router;
