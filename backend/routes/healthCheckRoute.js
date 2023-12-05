require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send({ "message": "Running Backend works" });
    console.log("Running health check");
})

module.exports = router;