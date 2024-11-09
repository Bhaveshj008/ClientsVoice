const {TestimonialResponse, FeedbackResponse} = require('../models/FormResponses');

const Space = require('../models/spaceModel');

exports.submitFormData = async (req, res) => {
    try {
        const { spaceId, feedbackFormData, testimonialFormData} = req.body;

        // Find the space by spaceId
        const space = await Space.findById(spaceId);
        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }

        // Save feedback responses in the FeedbackResponses schema
        if (feedbackFormData) {
            const feedbackResponse = new FeedbackResponse({
                spaceId: spaceId,
                responses: feedbackFormData
            });

            await feedbackResponse.save();
        }

        // Save testimonial responses in the TestimonialResponses schema
        if (testimonialFormData) {
            const testimonialResponse = new TestimonialResponse({
                spaceId: space._id,
                responses: testimonialFormData
            });

            await testimonialResponse.save();
        }

        return res.status(200).json({ message: 'Form submitted successfully.' });

    } catch (error) {
        console.error('Error submitting form data:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};
