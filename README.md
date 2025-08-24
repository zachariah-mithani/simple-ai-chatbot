# Simple AI Chatbot

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![NLTK](https://img.shields.io/badge/NLTK-3.8-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A simple AI chatbot built with Python and NLTK as part of the IBM Level 1 Build Your Own Chatbot certification. This project demonstrates foundational natural language processing (NLP) skills, including intent recognition and response generation using a JSON-based intent system. The chatbot engages in basic conversations and serves as a portfolio piece for entry-level software development and AI roles.

## Features

- Responds to user inputs with predefined responses based on intent matching.
- Supports basic intent recognition for common conversational topics (e.g., greetings, questions).
- Text-based interface for easy interaction via the console.
- Built with beginner-friendly Python libraries, focusing on NLP fundamentals.
- Lightweight and easy to extend with new intents or features.

## Prerequisites

To run this chatbot, ensure you have the following installed:

- Python 3.8 or higher
- pip (Python package manager)
- Git (for cloning the repository)
- Required Python libraries (listed in `requirements.txt`)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zachariah-mithani/simple-ai-chatbot.git
   cd simple-ai-chatbot

Set up a virtual environment (optional but recommended):
bashpython -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies:
bashpip install -r requirements.txt


## Usage

### Run the chatbot:
bashpython chatbot.py

### Interact with the chatbot:

Type your message in the console and press Enter.
The chatbot responds based on intents defined in intents.json.
To exit, type quit or exit.



## Example Interaction
textYou: Hi! How are you?
Chatbot: Hello! I'm doing great, thanks for asking! How about you?
You: What's the weather like?
Chatbot: I don't have real-time weather data, but it's always sunny in my world! 😄
You: Tell me a joke
Chatbot: Why did the computer go to art school? Because it wanted to learn how to draw a better "byte"!
Project Structure

chatbot.py: Main script to run the chatbot.
intents.json: Defines intents and responses for the chatbot's conversation logic.
requirements.txt: Lists required Python libraries.
tests/: Contains unit tests for core chatbot functions.
screenshots/: Stores images of the chatbot in action.
README.md: Project documentation.
LICENSE: MIT License file.

## Technologies Used

Python: Core programming language (v3.8+).
NLTK: For natural language processing (tokenization, stemming, and intent matching).
JSON: For storing and loading intents and responses in intents.json.
pytest: For unit testing core chatbot functionality.

## Testing
The project includes unit tests to ensure reliable intent matching and response generation. To run the tests:
bashpytest tests/
A GitHub Actions workflow is configured to run tests automatically on every push. See .github/workflows/test.yml for details.
Limitations

Handles only basic conversational intents; complex or ambiguous queries may not be recognized.
Limited to text-based console input/output (no GUI or web interface yet).
No external API integration for real-time data (e.g., weather or news).
Responses are static and depend on predefined intents in intents.json.

## Future Improvements

Add a web interface using Flask or Streamlit for broader accessibility.
Integrate an external API (e.g., OpenWeatherMap) for dynamic responses.
Implement a machine learning model (e.g., scikit-learn classifier) for improved intent recognition.
Expand intents.json with more conversational topics and synonyms.
Add support for multilingual input using advanced NLP libraries like spaCy.

## Contributing
Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines on how to contribute, including submitting issues or pull requests.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

Built as part of the IBM Level 1 Build Your Own Chatbot certification.
Inspired by NLTK documentation and online NLP tutorials.
Thanks to the open-source community for providing robust libraries like NLTK and pytest.
