const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const FeedbackForm = require('../models/FeedbackFormConfig');
const TestimonialForm = require('../models/TestimonialFormConfig');
const { FeedbackResponse, TestimonialResponse } = require('../models/FormResponses');
const { generateUniqueLink } = require('../services/uniqueLinkService');
const { generateForm } = require('../services/formService');
const { deleteSpaceData } = require('../services/deleteSpace');

const cloudinary = require('../services/cloudinaryConfig')




// Save or Update Space
const saveSpace = async (req, res) => {
  try {
    const { method } = req;
    const {
      spaceId,
      spaceName,
      logo, // Expect this as a file path or base64 data from the request
      organizationName,
      businessCategory,
      feedbackFormConfig,
      testimonialFormConfig,
    } = req.body;

    if (!["POST", "PUT"].includes(method)) {
      return res.status(405).json({ message: "Method not allowed." });
    }
    

    let space;
    if (method === "POST") {
      if (!spaceName || !organizationName || !businessCategory) {
        return res.status(400).json({ message: "Missing required fields for creating a space." });
      }
      
      // Create new Space
      space = new Space({
        clientId: req.client.clientId,
        spaceName,
        logo,
        organizationName,
        businessCategory,
        uniqueLink: await generateUniqueLink(spaceName),
      });


      const savedSpace = await space.save();

      // Link space to client
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

      const [savedFeedbackForm, savedTestimonialForm] = await Promise.all([
        feedbackForm.save(),
        testimonialForm.save(),
      ]);

      // Assign form IDs to the space and save
      Object.assign(savedSpace, {
        feedbackFormId: savedFeedbackForm._id,
        testimonialFormId: savedTestimonialForm._id,
      });
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
    }
  } catch (error) {
    console.error("Error handling space:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};



// Generate Form
const generateFormConfig = async (req, res) => {
  try {
    const { prompt } = req.body;
    const feedbackFormConfig = await generateForm(prompt);
    const testimonialFormConfig = {
      fields: [
        { id: 'TestimonialName', type: 'text', name: 'name', label: 'Name', required: true },
        { id: 'TestimonialEmail', type: 'email', name: 'email', label: 'Email', required: true },
        { id: 'TestimonialPosition', type: 'text', name: 'position', label: 'Position', required: true },
        { id: 'TestimonialTextArea', type: 'textarea', name: 'testimonial', label: 'Testimonial', required: true },
        { id: 'TestimonialImage', type: 'file', name: 'image', label: 'Image',accept: 'image/*', multiple: false},
      ],
    };

    res.json({ feedbackFormConfig, testimonialFormConfig });
  } catch (error) {
    res.status(500).json({ message: 'Error generating form preview.' });
  }
};

// Delete Space and Related Data
const deleteSpace = async (req, res) => {
  const { spaceID } = req.params;
  try {
    const responseDetails = await deleteSpaceData(req.client.clientId, spaceID);
    res.status(200).json({ message: 'Space and related data deleted successfully.', details: responseDetails });
  } catch (error) {
    console.error('Error deleting space:', error);
    res.status(500).json({ message: 'Failed to delete space and related data.', error: error.message });
  }
};

// Get Complete Space Data
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
};

module.exports = { saveSpace, generateFormConfig, deleteSpace, getCompleteSpace };
