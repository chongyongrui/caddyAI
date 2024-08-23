const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const authenticateToken = require('../../authMiddleware');




// Secret for JWT (You can move this to an environment variable)
const JWT_SECRET = "your_jwt_secret_key";

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists
        const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (user.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.query("INSERT INTO Users (email, password) VALUES (?, ?)", [email, hashedPassword]);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get('/me', authenticateToken, (req, res) => {
    res.json({ email: req.user.email });
});

module.exports = router;
