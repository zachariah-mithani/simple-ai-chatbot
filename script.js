async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
        method: "POST",
        headers: { "Authorization": "Bearer hf_YOUR_HUGGINGFACE_API_KEY", "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: userInput })
    });

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.generated_text || "I don't understand."}</p>`;
    document.getElementById("user-input").value = "";
}
