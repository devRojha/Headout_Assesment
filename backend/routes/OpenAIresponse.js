
const express = require("express");

const parseUnifiedPost = require("../services/openAiService.js");
const { getOpenAIResponse } = require("../controllers/openAiController.js");

const router = express.Router();

// post an Prompt
router.post("/", getOpenAIResponse)


module.exports = router