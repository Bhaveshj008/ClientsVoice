// services/openAiService.js
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the GoogleGenerativeAI client with your Gemini API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a generative model with the specified configuration
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Use the appropriate Gemini model
    generationConfig: {
        responseMimeType: "application/json",
    },
});

// Function to generate the form configuration based on the provided prompt
async function generateFormConfiguration(prompt) {
    try {
        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Log the entire response for debugging purposes
        console.log("Gemini API Response:", result);

        // Extract the generated response text
        const generatedText = result.response.text();

        // Return the generated form configuration
        return JSON.parse(generatedText); // Ensure the response is JSON formatted
    } catch (error) {
        console.error("Error generating form configuration:", error);
        throw new Error("Could not generate form configuration");
    }
}

module.exports = { generateFormConfiguration };
