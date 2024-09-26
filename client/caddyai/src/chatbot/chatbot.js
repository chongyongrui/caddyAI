import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Chatbot.css'; // Import the CSS file
import ReactMarkdown from 'react-markdown';
import ShotPredictionForm from './ShotPredictionForm.js';
import { GOLF_SP, CADDY_FORM, CHAT_SP, PAST_SHOT_SP } from './Prompts.js';
import ChatMessage from './ChatMessage';
import LoadingIcon from './LoadingIcon';
import ShotFeedBackForm from './ShotFeedbackForm.js'; // Import the new form

const Chatbot = ({ email, encodedShotData }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversationID, setConversationId] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showShotForm, setShowShotForm] = useState(false);
    const [formData, setFormData] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [caddyFormData, setCaddyFormData] = useState(null);

    const chatContainerRef = useRef(null);

    //const MY_API_KEY = "AIzaSyAZdtwG56ao9TXP_xxjAD2c4IkHx6AhQOs";
    //const { GoogleGenerativeAI } = require("@google/generative-ai");
    //const genAI = new GoogleGenerativeAI(MY_API_KEY);
    //const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generateAIResponse = useCallback(async (SP, text) => {
        try {
            const response = await fetch('http://localhost:3001/api/generate-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageHistory,
                    prompt: SP + text
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Error generating AI response:", error);
            return "Sorry, I couldn't process that. Please try again.";
        }
    }, [messageHistory]);
    
    const clubSelectionAI = useCallback(async (prompt) => {
        try {
            const response = await fetch('http://localhost:3001/api/generate-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageHistory,
                    prompt
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Error generating AI club selection response:", error);
            return "Sorry, I couldn't process that. Please try again.";
        }
    }, [messageHistory]);

    const parseCaddyShotData = useCallback((data) => {
        let finalPrompt = GOLF_SP;
        let distance = data.distance;
        let surface = data.surface;
        let slope = data.slope;
        let wind = "";

        switch (data.wind) {
            case "→":
                wind = "left to right";
                break;
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

        finalPrompt += `${CADDY_FORM} The distance to the hole is ${distance}. The ball is sitting in/on ${surface}. The slope of the course is ${slope}. The wind is ${wind}.`;

        console.log("final prompt to send to API is: " + finalPrompt);
        return finalPrompt;
    }, []);

    const saveConversationData = useCallback(async (inputValue, response) => {
        let convID = conversationID;

        if (convID == null) {
            convID = uuidv4();
            setConversationId(convID); 
        }

        const formData = {
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userid: -1,
            userEmail: email,
            conversationId: convID, 
            prompt: inputValue,
            response: response
        };

        try {
            const res = await fetch('http://localhost:3001/chatresponses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
    }, [conversationID, email]);

    const handleCaddyFormSubmit = useCallback(async (data) => {
        setCaddyFormData(data);
        var finalPrompt = parseCaddyShotData(data);
        const encodedShotDataString = JSON.stringify(encodedShotData);
        console.log("encoded shot data is " + encodedShotDataString);
        finalPrompt = finalPrompt + PAST_SHOT_SP + encodedShotDataString;

        const newMessage = { text: "What club to play for this shot?", type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        setLoading(true);
        const aiResponse = await clubSelectionAI(finalPrompt);

        const aiMessage = { text: aiResponse, type: 'reply', isShotPrediction: true };
        setMessageHistory((prevHistory) => [...prevHistory, aiMessage]);
        setLoading(false);

        await saveConversationData(finalPrompt, aiResponse);
    }, [messageHistory, clubSelectionAI, parseCaddyShotData, saveConversationData]);

    const handleInputChange = useCallback((event) => {
        setInputValue(event.target.value);
    }, []);

    const handleOpenNewForm = useCallback((messageIndex) => {
        const message = messageHistory[messageIndex];

        // Make sure the form data is passed properly when opening the feedback form
        setFormData({
            distance: message.formData?.distance,
            surface: message.formData?.surface,
            slope: message.formData?.slope,
            wind: message.formData?.wind,
            lie: message.formData?.lie,
        });

        setShowFeedbackForm(true); // Trigger the form to open
    }, [messageHistory]);

    const handleCloseNewForm = useCallback(() => {
        setShowFeedbackForm(false);
    }, []);

    const handleNewFormSubmit = useCallback((updatedData) => {
        console.log("Updated data from NewForm:", updatedData);
        setShowFeedbackForm(false);
    }, []);

    const handleShowForm = (() => {
        setShowForm(true);

    });

    const handleCloseForm = useCallback(() => {
        setShowForm(false);
    }, []);


    
    
    const handleSubmit = useCallback(async () => {
        if (inputValue.trim() === '') return;

        const newMessage = { text: inputValue, type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        setLoading(true);
        try {

            const aiResponse = await generateAIResponse(CHAT_SP, inputValue);

            const aiMessage = { text: aiResponse, type: 'reply' };
            setMessageHistory((prevHistory) => [...prevHistory, aiMessage]);

            await saveConversationData(inputValue, aiResponse);
        } catch (error) {
            console.error('Error during submit process:', error);
        } finally {
            setLoading(false);
            setInputValue('');
        }
    }, [inputValue, messageHistory, generateAIResponse, saveConversationData]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messageHistory]);

    return (
        <div className='bottom-section'>
            <div ref={chatContainerRef} className="chat-container">
                {messageHistory.map((msg, index) => (
                    <ChatMessage key={index} msg={msg} index={index} handleOpenNewForm={handleOpenNewForm} />
                ))}
                {loading && <LoadingIcon />}
            </div>

            {showFeedbackForm && (
                <ShotFeedBackForm
                    initialData={formData}
                    userEmail={email}
                    onClose={handleCloseNewForm}
                    onSubmit={handleNewFormSubmit}
                />
            )}
            {showForm && <ShotPredictionForm onClose={handleCloseForm} onSubmit={handleCaddyFormSubmit} />}


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

            <button className="open-form-button" onClick={handleShowForm}>Caddy ⛳</button>

            <p className='info'>
                CaddyGPT is your personal golf caddy to help you shoot lower scores!
            </p>
            <p className='info'>
                {email}
            </p>
        </div>
    );


};

export default Chatbot;
