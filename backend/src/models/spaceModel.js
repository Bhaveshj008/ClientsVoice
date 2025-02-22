const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    spaceName: { type: String, required: true },
    logo: { type: String }, 
    organizationName: { type: String },
    businessCategory: { type: String },
    feedbackCollection: { type: Boolean, default: false },
    testimonialCollection: { type: Boolean, default: false },
    responsesCount:{ type: Number, default: 0 },
    feedbackFormId: { type: mongoose.Schema.Types.ObjectId, ref: "FeedbackForm" },
    testimonialFormId: { type: mongoose.Schema.Types.ObjectId, ref: "TestimonialForm" },
    uniqueLink: { type: String, required: true, unique: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Space', spaceSchema);
