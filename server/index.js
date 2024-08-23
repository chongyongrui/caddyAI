// server/index.js

const express = require('express');
const cors = require('cors');
const app = express();



// Middleware
app.use(express.json());
app.use(cors());

// Routes
const postsRouter = require('./routes/Posts.js');
const authRoutes = require('./routes/auth');
app.use('/posts', postsRouter);
app.use('/auth', authRoutes);


// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
