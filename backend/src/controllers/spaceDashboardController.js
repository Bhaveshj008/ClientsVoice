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
            spaceName: space.spaceName, 
            logo: space.logo,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};


exports.getResponses = async (req, res) => {
    const { spaceID } = req.params;
    const { page = 1, limit = 5, filter = 'All' } = req.query; // Added `filter` query param
    
    try {
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Fetch testimonial responses
        let testimonialQuery = { spaceId: spaceID };
        if (filter === 'Liked') {
            testimonialQuery.liked = true;
        } else if (filter === 'Archived') {
            testimonialQuery.archived = true;
        } else if (filter === 'All') {
            testimonialQuery.archived = { $ne: true }; // Exclude archived testimonials
        }

        const testimonialResponses = await TestimonialResponse.find(testimonialQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Fetch corresponding feedback responses
        const feedbackResponses = await FeedbackResponse.find({ spaceId: spaceID })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        // Pair feedback with testimonials
        const pairedResponses = testimonialResponses.map((testimonial, index) => ({
            testimonial,
            feedback: feedbackResponses[index] || null, // Use index to pair
        }));
        
        const totalCount = await TestimonialResponse.countDocuments(testimonialQuery);

        res.json({
            responses: pairedResponses,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page),
            hasMore: skip + testimonialResponses.length < totalCount
        });
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

exports.getSingleTestimonial = async (req, res) => {
    const { testimonialID } = req.params;

    try {
        // Find the testimonial using the provided testimonialID
        const testimonial = await TestimonialResponse.findById(testimonialID);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Return the testimonial details
        res.json({
            message: 'Testimonial fetched successfully',
            testimonial,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonial', error });
    }
};
