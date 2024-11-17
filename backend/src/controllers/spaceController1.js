const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const FeedbackForm = require('../models/FeedbackFormConfig');
const TestimonialForm = require('../models/TestimonialFormConfig');
const {FeedbackResponse, TestimonialResponse} = require('../models/FormResponses')
const { generateFormConfiguration } = require('../services/openAiService');
const mongoose = require('mongoose');



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


const saveSpace = async (req, res) => {
  try {
    const { method } = req;
    const { spaceId, spaceName, logo, organizationName, businessCategory, feedbackFormConfig, testimonialFormConfig } = req.body;

    let space; // Declare a variable to hold the space document

    if (method === "POST") {
      // Handle creation
      const uniqueLink = await generateUniqueLink(spaceName);

      // Create a new Space
      space = new Space({
        clientId: req.client.clientId,
        spaceName,
        logo,
        organizationName,
        businessCategory,
        uniqueLink,
      });

      // Save the new space
      const savedSpace = await space.save();

      // Link to client
      await Client.findOneAndUpdate(
        { clientId: req.client.clientId },
        { $push: { spaces: savedSpace._id } },
        { new: true }
      );

      // Create Feedback and Testimonial Forms
      const feedbackForm = new FeedbackForm({
        clientId: req.client.clientId,
        spaceId: savedSpace._id,
        formConfig: feedbackFormConfig,
      });
      const testimonialForm = new TestimonialForm({
        clientId: req.client.clientId,
        spaceId: savedSpace._id,
        formConfig: testimonialFormConfig,
      });

      const savedFeedbackForm = await feedbackForm.save();
      const savedTestimonialForm = await testimonialForm.save();

      // Assign form IDs to the space
      savedSpace.feedbackFormId = savedFeedbackForm._id;
      savedSpace.testimonialFormId = savedTestimonialForm._id;
      await savedSpace.save();

      return res.status(201).json(savedSpace);
    } else if (method === "PUT") {
      // Handle editing
      if (!spaceId) {
        return res.status(400).json({ message: "Space ID is required for updating." });
      }

      // Find the existing space
      space = await Space.findById(spaceId);
      if (!space) {
        return res.status(404).json({ message: "Space not found." });
      }
      const uniqueLink = await generateUniqueLink(spaceName);

      // Update space fields
      if (spaceName) space.spaceName = spaceName;
      if (logo) space.logo = logo;
      if (organizationName) space.organizationName = organizationName;
      if (businessCategory) space.businessCategory = businessCategory;
      space.uniqueLink = uniqueLink;

      // Update Feedback Form
      if (feedbackFormConfig && space.feedbackFormId) {
        await FeedbackForm.findByIdAndUpdate(
          space.feedbackFormId,
          { formConfig: feedbackFormConfig },
          { new: true }
        );
      }

      // Update Testimonial Form
      if (testimonialFormConfig && space.testimonialFormId) {
        await TestimonialForm.findByIdAndUpdate(
          space.testimonialFormId,
          { formConfig: testimonialFormConfig },
          { new: true }
        );
      }

      // Save the updated space
      const updatedSpace = await space.save();

      return res.status(200).json(updatedSpace);
    } else {
      return res.status(405).json({ message: "Method not allowed." });
    }
  } catch (error) {
    console.error("Error handling space:", error);
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
                { id:"TestimonialPosition", type: "text", name: "position", label: "Position", required: true },
                { id:"TestimonialTextArea", type: "textarea", name: "testimonial", label: "Testimonial", required: true },
                { id:"TestimonialImage", type: "file", name: "image", label: "Image", required: false }
            ]
        };

        res.json({ feedbackFormConfig, testimonialFormConfig });
    } catch (error) {
        res.status(500).json({ message: "Error generating form preview." });
    }
};


const deleteSpace = async (req, res) => {
  const { spaceID } = req.params;

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  // Initialize response details
  const responseDetails = {
    clientUpdate: null,
    feedbackResponsesDeleted: null,
    testimonialResponsesDeleted: null,
    feedbackFormsDeleted: null,
    testimonialFormsDeleted: null,
    spaceDeleted: null,
  };

  try {
    // Step 1: Remove spaceID from clients collection
    const clientUpdateResult = await Client.findOneAndUpdate(
      { clientId: req.client.clientId },
      { $pull: { spaces: spaceID } },
      { session, new: true }
    );
    responseDetails.clientUpdate = clientUpdateResult
      ? "Client update successful"
      : "Failed to update client or spaceID not found in client's spaces";

    // Step 2: Delete all responses from feedbackresponse schema
    const feedbackResponseDeleteResult = await FeedbackResponse.deleteMany(
      { spaceId: spaceID },
      { session }
    );
    responseDetails.feedbackResponsesDeleted = `${feedbackResponseDeleteResult.deletedCount} feedback responses deleted`;

    // Step 3: Delete all responses from testimonialresponse schema
    const testimonialResponseDeleteResult = await TestimonialResponse.deleteMany(
      { spaceId: spaceID },
      { session }
    );
    responseDetails.testimonialResponsesDeleted = `${testimonialResponseDeleteResult.deletedCount} testimonial responses deleted`;

    // Step 4: Delete feedback forms from the form schema
    const feedbackFormDeleteResult = await FeedbackForm.deleteMany(
      { spaceId: spaceID },
      { session }
    );
    responseDetails.feedbackFormsDeleted = `${feedbackFormDeleteResult.deletedCount} feedback forms deleted`;

    // Step 5: Delete testimonial forms from the form schema
    const testimonialFormDeleteResult = await TestimonialForm.deleteMany(
      { spaceId: spaceID },
      { session }
    );
    responseDetails.testimonialFormsDeleted = `${testimonialFormDeleteResult.deletedCount} testimonial forms deleted`;

    // Step 6: Delete the space from the spaces schema
    const spaceDeleteResult = await Space.findByIdAndDelete(spaceID, { session });
    responseDetails.spaceDeleted = spaceDeleteResult
      ? "Space deleted successfully"
      : "Space not found";

    if (!spaceDeleteResult) {
      throw new Error("Space not found. No data was deleted.");
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    // Respond with success and details
    res.status(200).json({
      message: "Space and related data deleted successfully.",
      details: responseDetails,
    });
  } catch (error) {
    // Rollback all changes if an error occurs
    await session.abortTransaction();
    session.endSession();

    console.error("Error deleting space:", error);
    res.status(500).json({
      message: "Failed to delete space and related data due to an error.",
      details: responseDetails,
      error: error.message,
    });
  }
};

const getCompleteSpace = async (req, res)=>{
  const { spaceId } = req.params;
  try {
    // Fetch the space document
    const space = await Space.findById(spaceId);

    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    const [feedbackFormConfig, testimonialFormConfig] = await Promise.all([
      FeedbackForm.findOne({ spaceId: spaceId }),
      TestimonialForm.findOne({ spaceId: spaceId }),
    ]);
    const formConfig = {
      feedbackFormConfig: {feedbackFormConfig: feedbackFormConfig.formConfig.fields},
      testimonialFormConfig: {fields:testimonialFormConfig.formConfig.fields},
    }

    res.json({space, formConfig });
  }catch (error) {
    console.error('Error fetching space data:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
    saveSpace,
    generateForm,
    deleteSpace,
    getCompleteSpace
};
