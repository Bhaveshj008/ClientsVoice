const Space = require('../models/spaceModel');
const FeedbackForm = require('../models/FeedbackFormConfig');
const TestimonialForm = require('../models/TestimonialFormConfig');

exports.GetForm = async (req, res) => {
    try {
        const { spaceName } = req.params;

        // Find the space by spaceName
        const space = await Space.findOne({ uniqueLink: spaceName });
        if (!space) {
            return res.status(404).json({ message: "Space not found." });
        }

        // Retrieve FeedbackFormConfig and TestimonialFormConfig
        const feedbackForm = await FeedbackForm.findById(space.feedbackFormId);
        const testimonialForm = await TestimonialForm.findById(space.testimonialFormId);

        if (!feedbackForm || !testimonialForm) {
            return res.status(404).json({ message: "Form configurations not found." });
        }

        // Send the form configurations to the client
        return res.status(200).json({
            feedbackFormConfig: feedbackForm.formConfig,
            testimonialFormConfig: testimonialForm.formConfig,
            logo: space.logo,
            name: space.spaceName,
            spaceId:space._id
        });
    } catch (error) {
        console.error("Error fetching form configurations:", error);
        return res.status(500).json({ message: "Server error." });
    }
};

