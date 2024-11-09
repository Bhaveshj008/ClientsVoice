const mongoose = require('mongoose');

const feedbackResponseSchema = new mongoose.Schema({
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    responses: {
        type: Object, required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const testimonialResponseSchema = new mongoose.Schema({
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    responses: {
        type: Object, required: true
    },
    liked: { type: Boolean, default: false }, 
    archived: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FeedbackResponse = mongoose.model('FeedbackResponse', feedbackResponseSchema);
const TestimonialResponse = mongoose.model('TestimonialResponse', testimonialResponseSchema);

module.exports = { FeedbackResponse, TestimonialResponse };
