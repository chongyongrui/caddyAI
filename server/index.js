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
app.use('/auth', authRoutes);
app.use('/courses', coursesRouter);
app.use('/postscore', postsRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
