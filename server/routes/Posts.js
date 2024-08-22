// server/routes/posts.js

const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to get all posts
router.get('/', (req, res) => {
    db.query('SELECT * FROM GolfStats', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        }
        res.json(results);
    });
});

// Route to submit a new post
router.post('/', (req, res) => {
    const { userId, fairwayHit, fairwayReason, gir, girReason, putts } = req.body;
    const query = `
    INSERT INTO GolfStats (userId, fairwayHit, fairwayReason, gir, girReason, putts)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    db.query(query, [userId, fairwayHit, fairwayReason, gir, girReason, putts], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        res.status(201).json({ id: results.insertId, userId, fairwayHit, fairwayReason, gir, girReason, putts });
    });
});

module.exports = router;
