const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");
const authenticateToken = require("../authMiddleware");

const JWT_SECRET = "your_jwt_secret_key";

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (user.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO Users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/me", authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});

module.exports = router;
