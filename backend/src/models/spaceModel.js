const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    spaceName: { type: String, required: true },
    logo: { type: String }, // URL or path to the logo image
    organizationName: { type: String },
    businessCategory: { type: String },
    feedbackCollection: { type: Boolean, default: false },
    testimonialCollection: { type: Boolean, default: false },
    formConfig: { type: Object }, // For storing generated form structure
}, { timestamps: true });

module.exports = mongoose.model('spaces', spaceSchema);
