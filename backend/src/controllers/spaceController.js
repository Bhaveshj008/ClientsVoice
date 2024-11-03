const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const FeedbackForm = require('../models/FeedbackForm');
const TestimonialForm = require('../models/TestimonialForm');
const { generateFormConfiguration } = require('../services/openAiService');


// Create a new space
const createSpace = async (req, res) => {
    try {
         const { spaceName, logo, organizationName, businessCategory, feedbackFormConfig, testimonialFormConfig } = req.body;
   

        const newSpace = new Space({
            clientId: req.client.clientId, // Ensure this is set correctly
            spaceName,
            logo,
            organizationName,
            businessCategory
        });

        const savedSpace = await newSpace.save();
        console.log(req.client.clientId)
        // Update the client with the new space ID
        const updatedClient = await Client.findOneAndUpdate(
            { clientId: req.client.clientId }, // Correct filter object
            { $push: { spaces: savedSpace._id } }, // Push the new space ID
            { new: true } // Return the updated document
        );
        if (!updatedClient) {
            console.error("Client not found during update. Client ID:", req.client.clientId);
            return res.status(404).json({ message: "Client not found." });
        }

        const newFeedbackForm = new FeedbackForm({ clientId: req.client.clientId, spaceId: savedSpace._id, formConfig: feedbackFormConfig, });
        const savedFeedbackForm = await newFeedbackForm.save();
        savedSpace.feedbackFormId = savedFeedbackForm._id;

        const newTestimonialForm = new TestimonialForm({ clientId: req.client.clientId, spaceId: savedSpace._id, formConfig: testimonialFormConfig,  });
        const savedTestimonialForm = await newTestimonialForm.save();
        savedSpace.testimonialFormId = savedTestimonialForm._id;

        await savedSpace.save();
        return res.status(201).json(savedSpace);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};





// Get all spaces for the authenticated client
const getSpacesForAuthenticatedClient = async (req, res) => {
    try {
        const spaces = await Space.find({ clientId: req.client.clientId });
        console.log("Retrieved Spaces:", spaces); 
        return res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};

// Generate form configuration
const generateForm = async (req, res) => {
    try {
        const { prompt } = req.body;
         const defaultPrefix = "Generate feedback form JSON configuration for";
        const formattedPrompt = `${defaultPrefix} ${prompt}`;
        // Generate form configuration based on the AI prompt
        const feedbackFormConfig = await generateFormConfiguration(formattedPrompt);

        const testimonialFormConfig = {
            fields: [
                { type: "text", name: "name", label: "Name", required: true },
                { type: "text", name: "position", label: "Position", required: true },
                { type: "textarea", name: "testimonial", label: "Testimonial", required: true },
                { type: "image", name: "image", label: "Image", required: false }
            ]
        };

        res.json({ feedbackFormConfig, testimonialFormConfig });
    } catch (error) {
        res.status(500).json({ message: "Error generating form preview." });
    }
};

module.exports = {
    createSpace,
    getSpacesForAuthenticatedClient,
    generateForm,
};
