const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mainAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isInitialized: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

mainAdminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const MainAdmin = mongoose.model('MainAdmin', mainAdminSchema);
module.exports = MainAdmin;