// models/TestimonialForm.js
const mongoose = require("mongoose");

const TestimonialFormSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: "spaces" },
    formConfig: Object,  // Stores testimonial form config as JSON
});

module.exports = mongoose.model("TestimonialForm", TestimonialFormSchema);
