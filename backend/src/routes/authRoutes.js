const express = require('express');
<<<<<<< HEAD
const { register, login, googleLogin } = require('../controllers/authController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware'); // Adjust path as necessary

// Token verification endpoint
router.get('/verify-token', verifyToken, (req, res) => {
    // If the middleware doesn't throw an error, the token is valid
    res.status(200).json({
        success: true,
        message: 'Token is valid',
        user: req.client, // Contains the decoded token payload
    });
});

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin)
=======
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

module.exports = router;
