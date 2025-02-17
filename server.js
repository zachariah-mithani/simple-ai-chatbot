require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    const API_KEY = process.env.HUGGINGFACE_API_KEY;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
            method: "POST",
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();
        res.json({ reply: data.generated_text || "I don't understand." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Error occurred. Try again later." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
