const admin = require('../config/firebase'); 
const Client = require('../models/ClientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAuth } = require('firebase-admin/auth');
const emailService = require('../services/emailService');
const { newUserRegisteredEmail } = emailService


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const ClientExists = await Client.findOne({ email });
        if (ClientExists) return res.status(400).json({ message: 'Client already exists' });
        

        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await Client.create({ name, email, password: hashedPassword, lastLogin: new Date() });
        newUserRegisteredEmail(client);
        res.status(201).json({ message: 'Client registered successfully' });
    } catch (error) {
        console.error("Error in register:", error); // Log full error for debugging
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await Client.findOne({ email });
        if (!client || !(await bcrypt.compare(password, client.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        client.lastLogin = new Date();
        await client.save();

        const token = jwt.sign(
            {
                clientId: client.clientId,
                name: client.name,
                email: client.email,
                spaces: client.spaces
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ message: 'Google token is required' });
        }

        console.log("Received Google token:", token);

        const decodedToken = await getAuth().verifyIdToken(token);

        console.log("Decoded token:", decodedToken);
        // Extract user information
        const {
            email,
            name,
            picture,
            sub: googleId
        } = decodedToken;

        // Check if client exists
        let client = await Client.findOne({ 
            $or: [
                { email, authProvider: 'google' },
                { googleId }
            ]
        });

        if (client) {
            // Update existing Google-authenticated client
            client.lastLogin = new Date();
            client.name = name || client.name;
            client.profilePicture = picture || client.profilePicture;
            client.googleId = googleId;
            await client.save();
           
        } else {
            // Check if email exists but with password authentication
            const existingClient = await Client.findOne({ email });
            
            if (existingClient) {
                return res.status(400).json({ 
                    message: 'Email already exists with password authentication. Please use password login.',
                    authProvider: 'local'
                });
            }

            // Create new client
            client = await Client.create({
                name,
                email,
                googleId,
                authProvider: 'google',
                profilePicture: picture,
                spaces: [],
                lastLogin: new Date()
            });

            newUserRegisteredEmail(client);
        }

        // Generate token
        const jwtToken = jwt.sign(
            {
                clientId: client.clientId,
                name: client.name,
                email: client.email,
                spaces: client.spaces
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }  // Matching your existing login expiration
        );

        // Return response
        res.status(200).json({
            token: jwtToken,
            client: {
                clientId: client.clientId,
                name: client.name,
                email: client.email,
                spaces: client.spaces,
                profilePicture: client.profilePicture
            }
        });

    } catch (error) {
        console.error("Error in googleLogin:", error); // Matching your error logging style
        res.status(500).json({ message: error.message });
    }
};