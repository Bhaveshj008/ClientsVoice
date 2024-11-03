// src/controllers/dashboardController.js
const Space = require('../models/spaceModel');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; // assuming user ID is stored in req.user after authentication
        const spaces = await Space.find({ userId });
        const spaceCount = spaces.length;

        // If no spaces exist, return an empty array
        if (spaceCount === 0) {
            return res.status(200).json({
                message: "No spaces found.",
                spaces: [],
                spaceCount: 0,
                currentPlan: "Basic", // Change as per user plans
            });
        }

        // If spaces exist, return their data
        return res.status(200).json({
            message: "Spaces retrieved successfully.",
            spaces,
            spaceCount,
            currentPlan: "Basic", // Change as per user plans
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
