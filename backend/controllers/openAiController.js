const { parseUnifiedPost } = require("../services/openAiService"); // adjust path

// Controller for handling OpenAI prompt
const getOpenAIResponse = async (req, res) => {
    const prompt = req.body.prompt;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await parseUnifiedPost(prompt);
        res.status(200).json({ response });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
};

module.exports = {
    getOpenAIResponse,
};
