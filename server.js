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
const API_KEY = process.env.HUGGINGFACE_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.json({ reply: "Please enter a message!" });
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();

        if (data && data.generated_text) {
            res.json({ reply: data.generated_text });
        } else {
            res.json({ reply: "I didn't quite understand that. Can you try again?" });
        }
    } catch (error) {
        console.error("Error fetching from Hugging Face API:", error);
        res.status(500).json({ reply: "Sorry, an error occurred. Please try again later!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
