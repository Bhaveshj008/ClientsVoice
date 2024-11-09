const Client = require('../models/ClientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const ClientExists = await Client.findOne({ email });
        if (ClientExists) return res.status(400).json({ message: 'Client already exists' });

       
        console.log("Password before hashing:", password);

        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await Client.create({ name, email, password: hashedPassword });

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

        const token = jwt.sign(
            {
                clientId: client.clientId,
                name: client.name,
                email: client.email,
                spaces: client.spaces
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
