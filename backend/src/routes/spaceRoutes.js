const express = require('express');
const {createSpace, getSpacesForAuthenticatedClient, generateForm} = require('../controllers/spaceController');
const {verifyToken} = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to create a new space
router.post('/createSpace', verifyToken, createSpace);

// Route to get all spaces for the authenticated client
router.get('/getSpace', verifyToken, getSpacesForAuthenticatedClient);

// Route to generate form based on user input
router.post('/generate-form', verifyToken, generateForm);

module.exports = router;
