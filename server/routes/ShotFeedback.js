const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/post', async (req, res) => {
    const { email, distance, surface, slope, pinElevation, wind, lie, clubChoice } = req.body;

    console.log('Received shot feedback:', req.body);

    const query = 'INSERT INTO shothistory (email, datetimenow, distance, surface, slope, pinElevation, wind, lie, club) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [results] = await pool.query(query, [email, distance, surface, slope, pinElevation, wind, lie, clubChoice]);

        console.log('Insert result:', results);

        res.status(201).json({ id: results.insertId, email, distance, surface, slope, pinElevation, wind, lie, clubChoice });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

module.exports = router;
