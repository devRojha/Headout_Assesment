const { parseUnifiedPost } = require("../services/openAiService"); // adjust path

const openAiService = require("../services/openAiService.js");
// Controller for handling OpenAI prompt
const getOpenAIResponse = async (req, res) => {
    const prompt = req.body.prompt;
    

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        console.log("Received prompt:", prompt);
        const response = await openAiService.parseUnifiedPost({ text: prompt });
        res.status(200).json({ response });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
};

module.exports = {
    getOpenAIResponse,
};
