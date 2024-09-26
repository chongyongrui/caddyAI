const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const postsRouter = require("./routes/PostScore.js");
const authRoutes = require("./routes/Auth.js");
const coursesRouter = require("./routes/Courses.js");
const statsRouter = require("./routes/Stats.js");
const roundsRouter = require("./routes/GameStats.js");
const chatConversationRouter = require("./routes/ChatResponses.js");
const shotFeedbackRouter = require("./routes/ShotFeedback.js");
//const PromptLLMRouter = require("./routes/promptLLM.js");

app.use("/auth", authRoutes);
app.use("/courses", coursesRouter);
app.use("/postscore", postsRouter);
app.use("/stats", statsRouter);
app.use("/gamestats", roundsRouter);
app.use("/chatresponses", chatConversationRouter);
app.use("/shotfeedback", shotFeedbackRouter);
//app.use("/gemini", PromptLLMRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
