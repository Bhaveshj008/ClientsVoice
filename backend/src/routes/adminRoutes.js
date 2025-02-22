const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');
const mainAdminController = require('../controllers/mainAdminController');
const verifyAdminToken = require('../middlewares/verifyAdminToken');
const router = express.Router();

// Public routes (no authentication needed)
router.post('/admin/dashboard/initialize', mainAdminController.initialize);
router.post('/admin/dashboard/login', mainAdminController.login);

// Protected routes with individual middleware
router.post('/admin/dashboard/logout', verifyAdminToken, mainAdminController.logout);

router.get('/admin/dashboard/verify-session', verifyAdminToken, mainAdminController.verifySession);

// Dashboard routes
router.get(
    '/admin/dashboard/stats', 
    verifyAdminToken,
    adminDashboardController.getOverallStats
);

router.get(
    '/admin/dashboard/clients', 
    verifyAdminToken,
    adminDashboardController.getClientsWithSpaces
);

router.get(
    '/admin/dashboard/clients/:clientId', 
    verifyAdminToken,
    adminDashboardController.getClientDetails
);

router.get(
    '/admin/dashboard/analytics', 
    verifyAdminToken,
    adminDashboardController.getDashboardAnalytics
);

router.get(
    '/admin/dashboard/client/:clientId/analytics', 
    verifyAdminToken,
    adminDashboardController.getClientAnalytics
);

router.get(
    '/admin/dashboard/client/:clientId/stats', 
    verifyAdminToken,
    adminDashboardController.getClientStats
);

router.get(
    '/admin/dashboard/client/:clientId/activities', 
    verifyAdminToken,
    adminDashboardController.getClientActivities
);

router.post(
    '/admin/dashboard/client/:clientId/activities', 
    verifyAdminToken,
    adminDashboardController.addClientActivity
);

// You might also want to add error handling middleware
router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;