const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const MY_API_KEY = "AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs"; 
const genAI = new GoogleGenerativeAI(MY_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/generate-response', async (req, res) => {
    const { messageHistory, prompt } = req.body; 

    try {
        const conversationHistory = messageHistory.map(msg => ({
            role: msg.type === 'sender' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({
            history: conversationHistory,
            generationConfig: { maxOutputTokens: 1000 }
        });

        let responseText = '';
        const result = await chat.sendMessageStream(prompt);
        
        for await (const chunk of result.stream) {
            responseText += chunk.text();
        }

        res.status(200).json({ response: responseText });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Error generating AI response" });
    }
});

module.exports = router;
