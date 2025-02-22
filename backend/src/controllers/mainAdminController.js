const MainAdmin = require('../models/MainAdminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const mainAdminController = {
    // Initialize main admin (can only be done once)
    async initialize(req, res) {
        try {
            // Check if admin already exists
            const adminExists = await MainAdmin.findOne({ isInitialized: true });
            if (adminExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Main admin already initialized'
                });
            }

            const { email, password } = req.body;

            const admin = new MainAdmin({
                email,
                password,
                isInitialized: true
            });

            await admin.save();

            res.status(201).json({
                success: true,
                message: 'Main admin initialized successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Initialization failed',
                error: error.message
            });
        }
    },

    // Admin login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const admin = await MainAdmin.findOne({ email });
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Update last login
            admin.lastLogin = new Date();
            await admin.save();

            // Generate token
            const token = jwt.sign(
                { id: admin._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                success: true,
                token
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Login failed',
                error: error.message
            });
        }
    },
    async logout(req, res) {
        try {
            // Get token from header
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided'
                });
            }

            // You might want to add the token to a blacklist if needed
            // await BlacklistedToken.create({ token });

            res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Logout failed',
                error: error.message
            });
        }
    },

    // Verify token/session
    async verifySession(req, res) {
        try {
            const admin = await MainAdmin.findById(req.admin.id).select('-password');
            res.status(200).json({
                success: true,
                data: admin
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Invalid session'
            });
        }
    }

};


module.exports = mainAdminController;