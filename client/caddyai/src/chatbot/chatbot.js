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

    const GOLF_SP = "You are a highly knowledgeable and experienced golf caddy, with a deep understanding of golf strategy, club selection, and course management. Your role is to provide precise and strategic recommendations for club selection based on various factors such as the ball's lie, wind conditions, slope, distance to the hole, and the specific characteristics of the course. When giving advice: Always consider the player's skill level and any potential risks. Prioritize accuracy and consistency over aggressive play unless the situation calls for it. Provide a brief explanation for your recommendations to help the player understand the reasoning behind your choices. When uncertain, suggest a safe option that minimizes risk. You are here to help the player make the best possible decisions to improve their game and lower their score. Always try to keep the response short, concise and to the point with minimal explanation. When shot history data is provided, be as mathematical and statistical, taking more emphasis on more recent golf shots to make a better suggestion. For promts not related to golf, reply that you are not able to help. This is the user's prompt: "



        const CADDY_FORM = 'I want to hit the ball for my next shot. Please advice whether i should club up or down, or hit my usual club for this distance. Also tell me if i should aim left, right or usual. Give a short and consice explanation too. Here are the details of the situation: '


    const parseCaddyShotData = (data) => {
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
    };
    
    
    

    const handleCaddyFormSubmit = async (data) => {
        setCaddyFormData(data);
        console.log('Form Data:', data);
        //parse data 
        let finalPrompt = parseCaddyShotData(data);

        const newMessage = { text: "What club to play for this shot?", type: 'sender' };
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);
        
        // Ensure inputValue is set before proceeding
        setLoading(true);
        const aiResponse = await clubSelectionAI(finalPrompt);
        const aiMessage = { text: aiResponse, type: 'reply' };
        setMessageHistory([...updatedHistory, aiMessage]);
        setLoading(false);
        // Save the conversation data
        await saveConversationData(finalPrompt, aiResponse);
        
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    

    const handleShowForm = () => {    
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };


    const saveConversationData = async (inputValue, response) => {
        let convID = conversationID;
        
        // Generate a new conversation ID if it’s null
        if (convID == null) {
            convID = uuidv4();
            setConversationId(convID); // Set it in state
        }
    
        const formData = {
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userid: -1, // Placeholder for User ID
            userEmail: email,
            conversationId: convID, // Use the locally defined convID
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
                  //  maxOutputTokens: 1000,
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
            <button className="open-form-button" onClick={handleShowForm}>Open Form</button>
            {showForm && <ShotPredictionForm onClose={handleCloseForm} onSubmit={handleCaddyFormSubmit}/>}
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
