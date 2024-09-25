import React from 'react';

const InputForm = ({ inputValue, handleInputChange, handleSubmit }) => (
    <>
        <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Type your message...' />
        <div className='input-container'>
            <div id='submit' onClick={handleSubmit}>
                Go ⏎
            </div>
        </div>
    </>
);

export default InputForm;
