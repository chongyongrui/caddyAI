const express = require('express');
const router = express.Router();
const pool = require('../database'); 

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
    const { email, fairwayHit, fairwayReason, gir, girReason, putts, selectedCourse, hole, dateTime , gameID } = req.body;

    const userId = -1; // Set userId to -1 for development
    console.log(selectedCourse)
    const query = `
        INSERT INTO golfstats (userId, email, fairwayHit, fairwayReason, gir, girReason, putts, course, hole, dateTime, gameid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [results] = await pool.query(query, [userId, email, fairwayHit, fairwayReason, gir, girReason, putts, selectedCourse, hole, dateTime, gameID]);
        res.status(201).json({ id: results.insertId, userId, email, fairwayHit, fairwayReason, gir, girReason, putts, selectedCourse, hole, dateTime, gameID});
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});


module.exports = router;
