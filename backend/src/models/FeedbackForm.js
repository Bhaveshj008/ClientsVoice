// models/FeedbackForm.js
const mongoose = require("mongoose");

const FeedbackFormSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: "spaces" },
    formConfig: Object,  // Stores form configuration as JSON
});

module.exports = mongoose.model("FeedbackForm", FeedbackFormSchema);
