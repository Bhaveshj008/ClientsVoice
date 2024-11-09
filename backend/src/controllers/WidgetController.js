const {TestimonialResponse} = require('../models/FormResponses');

exports.widget = async (req, res) => {
    const { spaceID } = req.params;

    try {
        const likedTestimonials = await TestimonialResponse.find({ spaceId: spaceID, liked: true });
        res.json(likedTestimonials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching liked testimonials', error });
    }
};
