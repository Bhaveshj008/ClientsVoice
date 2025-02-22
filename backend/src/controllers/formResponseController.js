const { TestimonialResponse, FeedbackResponse } = require('../models/FormResponses');
const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const emailService = require('../services/emailService');
const { testimonialAddedEmail } = emailService;

exports.submitFormData = async (req, res) => {
    try {
        const { clientId, spaceId, feedbackFormData, testimonialFormData } = req.body;

        // Find the space and client by their IDs
        const space = await Space.findById(spaceId);
        const client = await Client.findOne({ clientId });

        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }

        // Save feedback responses
        if (feedbackFormData) {
            const feedbackResponse = new FeedbackResponse({
                spaceId,
                responses: feedbackFormData
            });
            await feedbackResponse.save();
        }

        // Save testimonial responses
        if (testimonialFormData) {
            const testimonialResponse = new TestimonialResponse({
                spaceId: space._id,
                responses: testimonialFormData
            });
            await testimonialResponse.save();
            space.responsesCount += 1;
            await space.save();
            // Handle email notifications in the background
            testimonialAddedEmail(client, space, testimonialResponse);
        }

        // Respond immediately
        return res.status(200).json({ message: 'Form submitted successfully.' });

    } catch (error) {
        console.error('Error submitting form data:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};


