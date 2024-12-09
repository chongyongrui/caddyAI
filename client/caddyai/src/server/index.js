let dotenv = require("dotenv").config();
console.log(dotenv);
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const postsRouter = require("./routes/PostScore.js");
const authRoutes = require("./routes/Auth");
const coursesRouter = require("./routes/Courses");
const statsRouter = require("./routes/Stats");
const roundsRouter = require("./routes/GameStats");
const chatConversationRouter = require("./routes/ChatResponses.js");
const shotFeedbackRouter = require("./routes/ShotFeedback.js");
const chatApiRouter = require("./routes/chatapi");

app.use("/auth", authRoutes);
app.use("/courses", coursesRouter);
app.use("/postscore", postsRouter);
app.use("/stats", statsRouter);
app.use("/gamestats", roundsRouter);
app.use("/chatresponses", chatConversationRouter);
app.use("/shotfeedback", shotFeedbackRouter);
app.use("/api", chatApiRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
