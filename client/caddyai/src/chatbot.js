import React, { useState } from 'react';
import './chatbot.css'; // Import the CSS file
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Chatbot = () => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (inputValue.trim() === '') return; // Do nothing if input is empty

        // Add the sender's (user's) message to the messages array
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputValue, type: 'sender' }
        ]);

        setInputValue('');
        setLoading(true); // Set loading state to true to show spinner

        const aiResponse = await generateAIResponse(inputValue);

        // Add the AI's reply to the messages array and remove the loading state
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: aiResponse, type: 'reply' }
        ]);
        setLoading(false); // Set loading state to false after AI response
    };

    // Initialize API and Generative Model
    const MY_API_KEY = "AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs";
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(MY_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Function to generate AI response
    const generateAIResponse = async (prompt) => {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);

            return response.text();
        } catch (error) {
            console.error("Error generating AI response:", error);
            return "Sorry, I couldn't process that. There is an error with my connections. Please try again.";
        }
    };

    return (
        <div className='bottom-section'>
            <div className='chat-container'>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.type === 'sender' ? 'sender' : 'reply'}`}
                    >
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}
                {loading && (
                    <div className="chat-bubble reply">
                         <div className="spinner-border text-black" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )}
            </div>
            <div className='input-container'>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Type your message...'
                />
                <div id='submit' onClick={handleSubmit}>
                    Go ⏎
                </div>
            </div>
            <p className='info'>
                CaddyGPT is your personal golf caddy to help you shoot lower scores!
            </p>
        </div>
    );
};

export default Chatbot;
