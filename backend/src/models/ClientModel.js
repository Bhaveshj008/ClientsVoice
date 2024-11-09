const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'spaces' }],
    registrationDate:{type: Date, default: Date.now()},
    subscriptionPlan: { type: String, default: "none" } 
},{ timestamps: true });
module.exports = mongoose.model('Clients', clientSchema);
