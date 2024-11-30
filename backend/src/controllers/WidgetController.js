const { TestimonialResponse } = require('../models/FormResponses');

exports.widget = async (req, res) => {
    const { spaceID } = req.params;
    const { limit = 5, offset = 0 } = req.query; // Default to 5 testimonials per request

    try {
        // Fetch liked testimonials with pagination
        const likedTestimonials = await TestimonialResponse.find({ spaceId: spaceID, liked: true })
            .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
            .skip(parseInt(offset)) // Skip 'offset' number of documents
            .limit(parseInt(limit)); // Limit the result to 'limit' documents

        // Count total liked testimonials for pagination metadata
        const totalCount = await TestimonialResponse.countDocuments({ spaceId: spaceID, liked: true });

        // Respond with testimonials and pagination metadata
        res.json({
            data: likedTestimonials,
            total: totalCount,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching liked testimonials', error });
    }
};
