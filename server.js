const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors()); // Enable CORS for frontend access
app.use(bodyParser.json()); // Parse JSON request bodies

const API_KEY = process.env.HUGGINGFACE_API_KEY;

// ✅ Primary model (which may fail)
const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
// ✅ Backup model (if primary fails)
const FALLBACK_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

// Function to call Hugging Face API safely
async function fetchChatbotResponse(modelUrl, userMessage) {
    try {
        const response = await fetch(modelUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();

        // ✅ Log Hugging Face API response for debugging
        console.log(`🔍 API Response from ${modelUrl}:`, JSON.stringify(data, null, 2));

        // ✅ Handle API errors (e.g., inactive model)
        if (data.error) {
            console.error("⚠️ Hugging Face API Error:", data.error);
            return { error: data.error };
        }

        // ✅ Return valid AI response
        if (data && data.length > 0 && data[0].generated_text) {
            return { reply: data[0].generated_text };
        } else {
            return { reply: "I didn't quite understand that. Can you try again?" };
        }
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        return { reply: "Sorry, I'm having trouble right now. Try again later!" };
    }
}

// Chatbot endpoint
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.json({ reply: "Please enter a message!" });
    }

    console.log(`📩 User Input: "${userMessage}"`);

    // ✅ Try primary model first
    let chatbotResponse = await fetchChatbotResponse(API_URL, userMessage);

    // ✅ If primary model fails, use fallback model
    if (chatbotResponse.error) {
        console.log("🔄 Switching to fallback model...");
        chatbotResponse = await fetchChatbotResponse(FALLBACK_API_URL, userMessage);
    }

    res.json(chatbotResponse);
});

// ✅ Server listens on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
