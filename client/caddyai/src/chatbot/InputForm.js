import React from 'react';

const InputForm = ({ inputValue, handleInputChange, handleSubmit }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} 
                placeholder='Type your message...'
            />
            <div className='input-container'>
                <div id='submit' onClick={handleSubmit}>
                    Go ⏎
                </div>
            </div>
        </>
    );
};

export default InputForm;
