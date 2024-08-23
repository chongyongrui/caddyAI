const express = require('express');
const router = express.Router();
const pool = require('../database'); // Adjust path if necessary

// Route to get all golf courses
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM GolfCourses');
        res.json(results);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: 'Error fetching courses' });
    }
});

module.exports = router;
