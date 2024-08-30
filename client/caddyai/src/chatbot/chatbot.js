import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './chatbot.css'; // Import the CSS file
import ReactMarkdown from 'react-markdown';
import ShotPredictionForm from './shotpredictionform';

const Chatbot = ({ email }) => { // Destructure email from props
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversationID, setConversationId] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);

    const chatContainerRef = useRef(null); // Ref for the chat container

    const MY_API_KEY = "AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs";
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(MY_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const [showForm, setShowForm] = useState(false);

    const [caddyFormData, setCaddyFormData] = useState(null);

    const handleCaddyFormSubmit = async (data) => {
        setCaddyFormData(data);
        console.log('Form Data:', data);
        // send query to AI LLM with custom promp
        let customPrompt = data.lie;
        const newMessage = { text: "What club to play for this shot?", type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        // Ensure inputValue is set before proceeding
        setLoading(true);
        const aiResponse = await clubSelectionAI(customPrompt);
        const aiMessage = { text: aiResponse, type: 'reply' };
        setMessageHistory([...updatedHistory, aiMessage]);
        setLoading(false);
        // Save the conversation data
        await saveConversationData(inputValue, aiResponse);
        
    };

    const handleInputChange = (event) => {
        setInputValue();
    };
    

    const handleShowForm = () => {    
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };


    const saveConversationData = async (inputValue, response) => {
        if (!conversationID) {
            setConversationId(uuidv4());
        }

        const formData = {
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userid: -1, // Placeholder for User ID
            userEmail: email,
            conversationId: conversationID,
            prompt: inputValue,
            response: response
        };

        try {
            const res = await fetch('http://localhost:3001/chatresponses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Conversation saved:', data);
        } catch (error) {
            console.error('Error saving conversation details:', error);
        }
    };

    const generateAIResponse = async () => {
        try {
            const conversationHistory = messageHistory.map(msg => ({
                role: msg.type === 'sender' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            // Initialize chat with history
            const chat = model.startChat({
                history: conversationHistory,
                generationConfig: {
                    maxOutputTokens: 100,
                }
            });

            // Send the latest message and get the AI's response
            const result = await chat.sendMessageStream(inputValue);
            let responseText = '';

            for await (const chunk of result.stream) {
                responseText += chunk.text();
            }

            return responseText;
        } catch (error) {
            console.error("Error generating AI response:", error);
            return "Sorry, I couldn't process that. Please try again.";
        }
    };

    const clubSelectionAI = async (prompt) => {
        try {
            const conversationHistory = messageHistory.map(msg => ({
                role: msg.type === 'sender' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            // Initialize chat with history
            const chat = model.startChat({
                history: conversationHistory,
                generationConfig: {
                    maxOutputTokens: 100,
                }
            });
            const result = await chat.sendMessageStream(prompt);
            let responseText = '';

            for await (const chunk of result.stream) {
                responseText += chunk.text();
            }

            return responseText;
        } catch (error) {
            console.error("Error generating AI club selection response:", error);
            return "Sorry, I couldn't process that. Please try again.";
        }
    };

    const handleSubmit = async () => {
        if (inputValue.trim() === '') return;

        // Add the sender's (user's) message to the message history
        const newMessage = { text: inputValue, type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        // Ensure inputValue is set before proceeding
        setLoading(true);

        try {
            const aiResponse = await generateAIResponse();

            // Add the AI's reply to the message history
            const aiMessage = { text: aiResponse, type: 'reply' };
            setMessageHistory([...updatedHistory, aiMessage]);

            // Save the conversation data
            await saveConversationData(inputValue, aiResponse);
        } catch (error) {
            console.error('Error during submit process:', error);
        } finally {
            setLoading(false);
            setInputValue(''); // Clear input field after processing
        }
    };

    useEffect(() => {
        // Auto-scroll to the bottom of the chat container when messages update
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messageHistory]); // Dependency array ensures this runs when messageHistory updates

    return (
        <div className='bottom-section'>
            <div className='chat-container' ref={chatContainerRef}>
                {messageHistory.map((msg, index) => (
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
            <button className="open-form-button" onClick={handleShowForm}>Open Form</button>
            {showForm && <ShotPredictionForm onClose={handleCloseForm} onSubmit={handleCaddyFormSubmit}/>}
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
