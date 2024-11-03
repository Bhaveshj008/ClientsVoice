const Space = require('../models/spaceModel');
const Client = require('../models/ClientModel');
const mongoose = require('mongoose');


// Create a new space
const createSpace = async (req, res) => {
    try {
        const { spaceName, logo, organizationName, businessCategory, feedbackCollection, testimonialCollection } = req.body;

        const newSpace = new Space({
            clientId: req.client.clientId, // Ensure this is set correctly
            spaceName,
            logo,
            organizationName,
            businessCategory,
            feedbackCollection,
            testimonialCollection
        });

        const savedSpace = await newSpace.save();
        console.log(req.client.clientId)
        // Update the client with the new space ID
        const updatedClient = await Client.findOneAndUpdate(
            { clientId: req.client.clientId }, // Correct filter object
            { $push: { spaces: savedSpace._id } }, // Push the new space ID
            { new: true } // Return the updated document
        );
        if (!updatedClient) {
            console.error("Client not found during update. Client ID:", req.client.clientId);
            return res.status(404).json({ message: "Client not found." });
        }

        return res.status(201).json(savedSpace);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};

// Get all spaces for the authenticated client
const getSpacesForAuthenticatedClient = async (req, res) => {
    try {
        const spaces = await Space.find({ clientId: req.client.clientId });
        console.log("Retrieved Spaces:", spaces); 
        return res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};

// Generate form configuration
const generateForm = async (req, res) => {
    try {
        const { spaceConfig } = req.body;

        // Here, you would implement the AI logic to generate the form structure based on spaceConfig
        // For now, we'll mock a generated form
        const generatedForm = {
            formStructure: {
                title: spaceConfig.spaceName,
                fields: spaceConfig.fields || [],
            },
        };

        return res.status(200).json(generatedForm);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = {
    createSpace,
    getSpacesForAuthenticatedClient,
    generateForm,
};
