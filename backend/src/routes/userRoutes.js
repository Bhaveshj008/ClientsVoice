
const express = require('express');
const { Profile } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware to verify JWT

const router = express.Router();

router.get('/user/profile', verifyToken, Profile); // Protect this route with JWT

module.exports = router;
