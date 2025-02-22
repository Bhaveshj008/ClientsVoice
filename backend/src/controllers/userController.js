// controllers/userController.js

const Client = require('../models/ClientModel');  // Adjust path if necessary

const Profile = async (req, res) => {
    try {
        // Access the userId from req.user (populated by the middleware)
        const userId = req.client.clientId; 

        // Fetch client profile based on the userId
        const client = await Client.find({ clientId: userId });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Return the client profile data
        res.status(200).json({ success: true, client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    Profile,
};
