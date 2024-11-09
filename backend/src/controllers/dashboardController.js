const Space = require('../models/spaceModel');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.client.clientId; 
        const spaces = await Space.find({ clientId: userId }, 'spaceName logo');

        const spaceCount = spaces.length;
        console.log(userId)

        // If no spaces exist, return an empty array
        if (spaceCount === 0) {
            
            return res.status(200).json({
                message: "No spaces found.",
                spaces: [],
                spaceCount: 0,
                currentPlan: "Basic", 
            });
        }

        // If spaces exist, return their data
        return res.status(200).json({
            message: "Spaces retrieved successfully.",
            spaces,
            spaceCount,
            currentPlan: "Basic", 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
