
const express = require("express");


const { getOpenAIResponse } = require("../controllers/openAiController.js");

const router = express.Router();

// post an Prompt
router.post("/", getOpenAIResponse)


module.exports = router