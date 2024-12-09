const express = require('express');
const router = express.Router();
const pool = require('../database'); // Use the promise-based connection pool

// Route to get all gamestats
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM gamestats');
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Route to submit a new post
router.post('/', async (req, res) => {
    const { gameid, datetime, email, total_score, teebox, scores, course} = req.body;

    // Override the userid with -1
    const userid = -1;

    // Serialize the scores dictionary to a JSON string
    const scoresJson = JSON.stringify(scores);

    const query = `
        INSERT INTO gamestats (gameid, datetime, userid, email, total_score, teebox, scores, course)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [results] = await pool.query(query, [gameid, datetime, userid, email, total_score, teebox, scoresJson, course]);
        res.status(201).json({ id: results.insertId, gameid, datetime, userid, email, total_score, teebox, scores, course });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

module.exports = router;
