const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const FeedbackForm = require('../models/FeedbackFormConfig');
const TestimonialForm = require('../models/TestimonialFormConfig');
const { generateFormConfiguration } = require('../services/openAiService');



async function generateUniqueLink(spaceName) {
    
    let uniqueLink = `${spaceName}`;
    let counter = 1;


    let existingSpace = await Space.findOne({ uniqueLink });

    // If the link exists, append a number and check again
    while (existingSpace) {
        // Increment counter and modify the unique link
        uniqueLink = `${spaceName}${counter}`;
        counter++;
        // Check again with the modified link
        existingSpace = await Space.findOne({ uniqueLink });
    }

  
    return uniqueLink;
}


const createSpace = async (req, res) => {
    try {
        const { spaceName, logo, organizationName, businessCategory, feedbackFormConfig, testimonialFormConfig } = req.body;

        // Generate a unique link for the space
        const uniqueLink = await generateUniqueLink(spaceName);
        console.log("Generated Unique Link:", uniqueLink);

        // Create a new Space instance with all the required fields, including uniqueLink
        const newSpace = new Space({
            clientId: req.client.clientId,
            spaceName,
            logo,
            organizationName,
            businessCategory,
            uniqueLink 
        });
        console.log("New Space (before saving):", newSpace);

        // Save the new Space to the database
        const savedSpace = await newSpace.save();
        console.log("Saved Space:", savedSpace);

        // Update the client with the new space ID
        const updatedClient = await Client.findOneAndUpdate(
            { clientId: req.client.clientId }, 
            { $push: { spaces: savedSpace._id } }, 
            { new: true } 
        );

        if (!updatedClient) {
            console.error("Client not found during update. Client ID:", req.client.clientId);
            return res.status(404).json({ message: "Client not found." });
        }

        // Create and save Feedback Form and Testimonial Form documents
        const newFeedbackForm = new FeedbackForm({ clientId: req.client.clientId, spaceId: savedSpace._id, formConfig: feedbackFormConfig });
        const savedFeedbackForm = await newFeedbackForm.save();
        savedSpace.feedbackFormId = savedFeedbackForm._id;

        const newTestimonialForm = new TestimonialForm({ clientId: req.client.clientId, spaceId: savedSpace._id, formConfig: testimonialFormConfig });
        const savedTestimonialForm = await newTestimonialForm.save();
        savedSpace.testimonialFormId = savedTestimonialForm._id;

        // Save the updated space with feedbackFormId and testimonialFormId
        await savedSpace.save();

        return res.status(201).json(savedSpace);
    } catch (error) {
        console.error("Error creating space:", error);
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
        const defaultPrefix = "Generate a JSON configuration for a feedback form that includes fields appropriate to";
        const defaultSuffix =`Please generate the following JSON configuration for a feedback form:
         {
            "feedbackFormConfig": [
              {
                
              }
            ]
          }
        }
        
        Instructions:
        1. Use HTML5 input types where appropriate, including checkboxes, dropdowns, radio buttons, file uploads, and range sliders.
        2. Each field must include a unique 'id' attribute, even for dropdown items.
        3. Ensure the JSON structure is not deeply nested; all fields should be directly within the 'feedbackForm' array of a single 'feedbackFormConfig'.
        4. Follow the exact format provided above without modification.`;
        const formattedPrompt = `${defaultPrefix} ${prompt} ${defaultSuffix}`;
      
        const feedbackFormConfig = await generateFormConfiguration(formattedPrompt);

        const testimonialFormConfig = {
            fields: [
                { id:"TestimonialName", type: "text", name: "name", label: "Name", required: true },
                { id:"TestimonialEmail", type: "email", name: "email", label: "Email", required: true },
                { id:"TestimonialEmail", type: "text", name: "position", label: "Position", required: true },
                { id:"TestimonialTextArea", type: "textarea", name: "testimonial", label: "Testimonial", required: true },
                { id:"TestimonialImage", type: "file", name: "image", label: "Image", required: false }
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
