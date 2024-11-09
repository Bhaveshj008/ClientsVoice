// models/TestimonialForm.js
const mongoose = require("mongoose");

const TestimonialFormSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: "spaces" },
    formConfig: Object,  
});

module.exports = mongoose.model("TestimonialForm", TestimonialFormSchema);
