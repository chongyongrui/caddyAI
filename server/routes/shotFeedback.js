const express = require('express');
const router = express.Router();
const pool = require('../database'); // Adjust path if necessary

router.post('/shotfeedback', async (req, res) => {
    const { distance, surface, slope, wind, lie, clubChoice } = req.body; // Ensure all fields are included

    const query = 'INSERT INTO shot_feedback (distance, surface, slope, wind, lie, club_choice) VALUES (?, ?, ?, ?, ?, ?)'; // Replace 'shot_feedback' with your actual table name

    try {
        const [results] = await pool.query(query, [distance, surface, slope, wind, lie, clubChoice]);
        res.status(201).json({ id: results.insertId, distance, surface, slope, wind, lie, clubChoice });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

module.exports = router;
