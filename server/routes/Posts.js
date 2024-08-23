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
    const { userId, fairwayHit, fairwayReason, gir, girReason, putts } = req.body;
    const query = `
        INSERT INTO GolfStats (userId, fairwayHit, fairwayReason, gir, girReason, putts)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
        const [results] = await pool.query(query, [userId, fairwayHit, fairwayReason, gir, girReason, putts]);
        res.status(201).json({ id: results.insertId, userId, fairwayHit, fairwayReason, gir, girReason, putts });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

module.exports = router;
