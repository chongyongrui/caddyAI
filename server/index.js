// server/index.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const postsRouter = require('./routes/Posts.js');
app.use('/posts', postsRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
