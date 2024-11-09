const {FeedbackResponse, TestimonialResponse } = require('../models/FormResponses');
const Space = require('../models/spaceModel');


exports.getStats = async (req, res) => {
    const { spaceID } = req.params;

    try {
        const space = await Space.findById(spaceID);
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        const feedbackCount = await FeedbackResponse.countDocuments({ spaceId: spaceID });
        const testimonialCount = await TestimonialResponse.countDocuments({ spaceId: spaceID });
        console.log(spaceID)
        res.json({
            feedbackCount,
            testimonialCount,
            spaceURL: space.uniqueLink, 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};


exports.getResponses = async (req, res) => {
    const { spaceID } = req.params;

    try {
        const feedbackResponses = await FeedbackResponse.find({ spaceId: spaceID });
        const testimonialResponses = await TestimonialResponse.find({ spaceId: spaceID });

       

        const pairedResponses = feedbackResponses.map((feedback, index) => ({
            feedback: feedback,
            testimonial: testimonialResponses[index] || {},  
        }));

        res.json(pairedResponses);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching responses', error });
    }
};



exports.toggleLike = async (req, res) => {
    const { spaceID, testimonialID } = req.params;

    try {
       
        const testimonial = await TestimonialResponse.findOne({ spaceId: spaceID, _id: testimonialID });

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }


        testimonial.liked = !testimonial.liked;

       
        await testimonial.save();

        res.json({
            message: testimonial.liked ? 'Testimonial liked' : 'Testimonial unliked',
            testimonial,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating like status on testimonial', error });
    }
};



// Toggle the archived status of a testimonial
exports.toggleArchive = async (req, res) => {
    const { spaceID, testimonialID } = req.params;

    try {
        const testimonial = await TestimonialResponse.findOne({ spaceId: spaceID, _id: testimonialID });

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        testimonial.archived = !testimonial.archived; // Toggle archived status
        await testimonial.save();

        res.json({
            message: testimonial.archived ? 'Testimonial archived' : 'Testimonial unarchived',
            testimonial,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error archiving/unarchiving testimonial', error });
    }
};
