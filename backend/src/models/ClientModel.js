const mongoose = require('mongoose');
<<<<<<< HEAD

const clientSchema = new mongoose.Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId() 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        // Making password optional since Google auth users won't have one
        required: function() {
            return this.authProvider === 'local';
        }
    },
    spaces: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'spaces' 
    }],
    registrationDate: {
        type: Date, 
        default: Date.now()
    },
    lastLogin:{
        type: Date,
        required: true
    },
    subscriptionPlan: { 
        type: String, 
        default: "none" 
    },
    // New fields for Google authentication
    authProvider: {
        type: String,
        required: true,
        enum: ['local', 'google'],
        default: 'local'
    },
    googleId: {
        type: String,
        sparse: true,  // Allows null/undefined values
        unique: true   // But ensures uniqueness if value exists
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { 
    timestamps: true 
});

// Add index for faster queries
clientSchema.index({ email: 1, authProvider: 1 });

module.exports = mongoose.model('Clients', clientSchema);
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
