const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const postsRouter = require('./routes/postscore.js');
const authRoutes = require('./routes/auth');
const coursesRouter = require('./routes/courses');
const statsRouter = require('./routes/stats'); 
const roundsRouter = require('./routes/gamestats');
const chatConversationRouter = require('./routes/chatresponses.js')

app.use('/auth', authRoutes);
app.use('/courses', coursesRouter);
app.use('/postscore', postsRouter);
app.use('/stats', statsRouter); // Use the stats router
app.use('/gamestats', roundsRouter); 
app.use('/chatresponses', chatConversationRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
