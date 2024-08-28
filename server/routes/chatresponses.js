const express = require('express');
const router = express.Router();
const pool = require('../database'); // Adjust path if necessary

router.post('/', async (req, res) => {
    console.log("the received conversation body is " + req.body.prompt)
    const { userid, userEmail, conversationId, prompt, response } = req.body; // Ensure all fields are included
    console.log("the received user prompt is " + prompt)
    const query = 'INSERT INTO chataiconversation (userid, user_email, conversation_id, prompt, response) VALUES (?, ?, ?, ?, ?)';

    try {
        const [results] = await pool.query(query, [userid, userEmail, conversationId, prompt, response]);
        res.status(201).json({ id: results.insertId, userid, userEmail, conversationId, prompt, response });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

module.exports = router;
