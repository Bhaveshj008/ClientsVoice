const jwt = require('jsonwebtoken');
const MainAdmin = require('../models/MainAdminModel');

const verifyAdminToken = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if admin exists
        const admin = await MainAdmin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Add admin to request object
        req.admin = admin;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = verifyAdminToken;