const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(bodyParser.json()); // Parse JSON request bodies

const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const FALLBACK_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
const API_KEY = process.env.HUGGINGFACE_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.json({ reply: "Please enter a message!" });
    }

    try {
        console.log(`🔹 Received message from user: "${userMessage}"`);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();
        console.log("🔍 Hugging Face API Response:", JSON.stringify(data, null, 2));

        if (data.error) {
            console.error("⚠️ Model Error:", data.error);
            console.log("🔄 Switching to fallback model...");
            const fallbackResponse = await fetch(FALLBACK_API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: userMessage })
            });
            const fallbackData = await fallbackResponse.json();
            console.log("🔍 Fallback API Response:", JSON.stringify(fallbackData, null, 2));

            if (fallbackData && fallbackData.length > 0 && fallbackData[0].generated_text) {
                return res.json({ reply: fallbackData[0].generated_text });
            } else {
                return res.json({ reply: "Sorry, I couldn't understand that. Try again!" });
            }
        }

        if (data && data.length > 0 && data[0].generated_text) {
            res.json({ reply: data[0].generated_text });
        } else {
            res.json({ reply: "I didn't quite understand that. Can you try again?" });
        }
    } catch (error) {
        console.error("❌ API Request Failed:", error);
        res.status(500).json({ reply: "Sorry, an error occurred. Please try again later!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${POR
