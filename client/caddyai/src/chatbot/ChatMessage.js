import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ msg, index, handleOpenNewForm }) => (
    <div key={index} className={`chat-bubble ${msg.type === 'sender' ? 'sender' : 'reply'}`}>
        <ReactMarkdown>{msg.text}</ReactMarkdown>
        {msg.isShotPrediction && <button onClick={() => handleOpenNewForm(index)}>Feedback</button>}
    </div>
);

export default ChatMessage;
