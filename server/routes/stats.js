// src/routes/stats.js

const express = require('express');
const router = express.Router();
const pool = require('../database');

// Route to get statistics for a user
router.get('/stats', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Fetch data for the specified email
        const [results] = await pool.query('SELECT * FROM golfstats WHERE email = ?', [email]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.get('/recent-game', async (req, res) => {
    const email = req.query.email;

    try {
        // Find the most recent date for the user
        const [[mostRecentDate]] = await pool.query(
            'SELECT DATE(dateTime) as mostRecentDate FROM golfstats WHERE email = ? GROUP BY DATE(dateTime) ORDER BY DATE(dateTime) DESC LIMIT 1',
            [email]
        );

        if (!mostRecentDate) {
            return res.json([]);
        }

        // Fetch all rows for that most recent date
        const [results] = await pool.query(
            'SELECT * FROM golfstats WHERE email = ? AND DATE(dateTime) = ? ORDER BY dateTime DESC',
            [email, mostRecentDate.mostRecentDate]
        );

        res.json(results);
    } catch (err) {
        console.error('Error fetching recent game data:', err);
        res.status(500).json({ error: 'Error fetching recent game data' });
    }
});

module.exports = router;
