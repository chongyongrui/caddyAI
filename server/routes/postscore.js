const express = require('express');
const router = express.Router();
const pool = require('../database'); // Use the promise-based connection pool

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM GolfStats');
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Route to submit a new post
router.post('/', async (req, res) => {
    const { email, fairwayHit, fairwayReason, gir, girReason, putts, course, hole, dateTime } = req.body;
    const userId = -1; // Set userId to -1 for development

    const query = `
        INSERT INTO GolfStats (userId, email, fairwayHit, fairwayReason, gir, girReason, putts, course, hole, dateTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [results] = await pool.query(query, [userId, email, fairwayHit, fairwayReason, gir, girReason, putts, course, hole, dateTime]);
        res.status(201).json({ id: results.insertId, userId, email, fairwayHit, fairwayReason, gir, girReason, putts, course, hole, dateTime });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});


module.exports = router;
