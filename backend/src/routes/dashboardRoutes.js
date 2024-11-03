// src/routes/dashboardRoutes.js
const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware to verify JWT

const router = express.Router();

router.get('/dashboard', verifyToken, getDashboardData); // Protect this route with JWT

module.exports = router;
