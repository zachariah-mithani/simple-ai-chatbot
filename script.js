const responses = {
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
    "your name": "I'm a simple chatbot created by you!",
    "default": "I'm not sure I understand. Can you ask something else?"
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    let botResponse = responses["default"];
    for (let key in responses) {
        if (userInput.includes(key)) {
            botResponse = responses[key];
            break;
        }
    }

    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    document.getElementById("user-input").value = "";
}
