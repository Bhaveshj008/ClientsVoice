
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite", 
    generationConfig: {
        responseMimeType: "application/json",
    },
});


async function generateFormConfiguration(prompt) {
    try {
        
        const result = await model.generateContent(prompt);

        console.log("Gemini API Response:", result);

        
        const generatedText = result.response.text();

        return JSON.parse(generatedText);
    } catch (error) {
        console.error("Error generating form configuration:", error);
        throw new Error("Could not generate form configuration");
    }
}

module.exports = { generateFormConfiguration };
