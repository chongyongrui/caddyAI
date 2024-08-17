const express = require("express");
const router = express.Router();
const { Posts } = require('../models');

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts);
});

// Define a path and handler for POST requests
router.post("/", async (req, res) => {
    //have to follow the format of the mysql table schema
    const post = req.body;
    await Posts.create(post); //sequalize is async method
    res.json(post);
});



module.exports = router;
