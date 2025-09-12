const { parseUnifiedPost } = require("../utils/openAi"); // adjust path

const OpenAIresponse = require("../utils/openAi.js");

// get Ai response
const aiResponse = async (prompt) => {
    
    try {
        console.log("Received prompt:", prompt);
        const response = await OpenAIresponse.parseUnifiedPost({ text: prompt });
        return response;
    } catch (error) {
        console.error("OpenAI error:", error);
        throw { status: 500, message: error.message };
    }
};


module.exports = {
    aiResponse,
};
