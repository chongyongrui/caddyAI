const express = require('express');
const app = express();
const cors = require("cors");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use("/Posts", postRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server has started on port 3001!");
    });
}).catch(error => {
    console.error("Error syncing database:", error);
});
