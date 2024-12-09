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

router.get('/coursesearch', async (req, res) => {
    const { name } = req.query; // Assuming you're passing the course name as a query parameter
    try {
        const [results] = await pool.query('SELECT * FROM GolfCourses WHERE course_name = ?', [name]);
        if (results.length > 0) {
            res.json(results[0]); // Return the first matching course (assuming names are unique)
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        console.error('Error fetching course:', err);
        res.status(500).json({ error: 'Error fetching course' });
    }
});

module.exports = router;
