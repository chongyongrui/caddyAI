import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './chatbot.css'; // Import the CSS file
import ReactMarkdown from 'react-markdown';
import ShotPredictionForm from './shotpredictionform';
import { GOLF_SP, CADDY_FORM } from './prompts.js';
import ShotFeedBackForm from './shotfeedbackform.js'; // Import the new form

const Chatbot = ({ email }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversationID, setConversationId] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showShotForm, setShowShotForm] = useState(false); // Declared state for showShotForm
    const [formData, setFormData] = useState(null); // Declared state for formData
    const [showNewForm, setShowNewForm] = useState(false); // Declared state for showNewForm
    const [caddyFormData, setCaddyFormData] = useState(null);

    const chatContainerRef = useRef(null);

    const MY_API_KEY = "AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs";
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(MY_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const parseCaddyShotData = (data) => {
        let wind = '';
        switch (data.wind) {
            case "→":
            case "←":
                wind = "right to left";
                break;
            case "↓":
                wind = "headwind";
                break;
            case "↑":
                wind = "tailwind";
                break;
            default:
                wind = "negligible";
        }

        return `${GOLF_SP}${CADDY_FORM} The distance to the hole is ${data.distance} yards. The ball is on ${data.surface}. The slope is ${data.slope}. The wind is ${wind}.`;
    };

    const handleCaddyFormSubmit = async (data) => {
        setCaddyFormData(data);
        const finalPrompt = parseCaddyShotData(data);

        // Add the sender's (user's) message to the message history
        const newMessage = { text: "What club to play for this shot?", type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        setLoading(true);
        const aiResponse = await clubSelectionAI(finalPrompt);

        // Add the AI's reply with the isShotPrediction flag set to true
        const aiMessage = { text: aiResponse, type: 'reply', isShotPrediction: true };
        setMessageHistory([...updatedHistory, aiMessage]);
        setLoading(false);

        await saveConversationData(inputValue, aiResponse);
    };


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleOpenNewForm = (messageIndex) => {
        const message = messageHistory[messageIndex];
    
        // Make sure the form data is passed properly when opening the feedback form
        setFormData({
            distance: message.formData?.distance,
            surface: message.formData?.surface,
            slope: message.formData?.slope,
            wind: message.formData?.wind,
            lie: message.formData?.lie,
        });
    
        setShowNewForm(true); // Trigger the form to open
    };
    
    const handleCloseNewForm = () => {
        setShowNewForm(false); // Using setShowNewForm
    };

    const handleNewFormSubmit = (updatedData) => {
        console.log("Updated data from NewForm:", updatedData);
        setShowNewForm(false); // Using setShowNewForm
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    // Added missing handler functions
    const handleCloseShotForm = () => {
        setShowShotForm(false);
    };

    const handleShotFormSubmit = (data) => {
        console.log("Shot form data:", data);
        setShowShotForm(false); // Close the form after submission
    };

    const saveConversationData = async (inputValue, response) => {
        if (!conversationID) {
            setConversationId(uuidv4());
        }

        const formData = {
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userid: -1,
            userEmail: email,
            conversationId: conversationID,
            prompt: inputValue,
            response: response
        };

        try {
            const res = await fetch('http://localhost:3001/chatresponses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

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

            const chat = model.startChat({
                history: conversationHistory,
                generationConfig: { maxOutputTokens: 100 },
            });

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

            const chat = model.startChat({
                history: conversationHistory,
                generationConfig: { maxOutputTokens: 100 },
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

        const newMessage = { text: inputValue, type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        setLoading(true);
        try {
            const aiResponse = await generateAIResponse();

            const aiMessage = { text: aiResponse, type: 'reply' };
            setMessageHistory([...updatedHistory, aiMessage]);

            await saveConversationData(inputValue, aiResponse);
        } catch (error) {
            console.error('Error during submit process:', error);
        } finally {
            setLoading(false);
            setInputValue('');
        }
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messageHistory]);

    return (
        <div className='bottom-section'>
            <div className='chat-container' ref={chatContainerRef}>
                {messageHistory.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.type === 'sender' ? 'sender' : 'reply'}`}
                    >
                        <ReactMarkdown>{msg.text}</ReactMarkdown>

                        {/* Conditionally render the feedback button */}
                        {msg.isShotPrediction && (
                            <button onClick={() => handleOpenNewForm(index)}>Feedback</button>
                        )}
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

            {/* ShotPredictionForm */}
            <button className="open-form-button" onClick={handleShowForm}>Caddy Form</button>
            {showNewForm && (
    <ShotFeedBackForm
        initialData={formData} // Pass the form data here
        onClose={handleCloseNewForm}
        onSubmit={handleNewFormSubmit}
    />
)}


            {showForm && <ShotPredictionForm onClose={handleCloseForm} onSubmit={handleCaddyFormSubmit} />}
            {showNewForm && <ShotFeedBackForm formData onClose={handleCloseNewForm} onSubmit={handleNewFormSubmit} />}

            {/* Input and Send Button */}
            <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type your message...'
            />

            <div className='input-container'>
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
