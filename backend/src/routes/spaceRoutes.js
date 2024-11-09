const express = require('express');
const {createSpace, getSpacesForAuthenticatedClient, generateForm} = require('../controllers/spaceController');
const {verifyToken} = require('../middlewares/authMiddleware');
const {getStats, getResponses, toggleLike, toggleArchive} = require('../controllers/spaceDashboardController');

const router = express.Router();

// Route to create a new space
router.post('/createSpace', verifyToken, createSpace);

// Route to get all spaces for the authenticated client
router.get('/getSpace', verifyToken, getSpacesForAuthenticatedClient);

// Route to generate form based on user input
router.post('/generate-form', verifyToken, generateForm);




// Get total count of feedback and testimonials
router.get('/:spaceID/stats', verifyToken, getStats);

// Get all responses (feedback/testimonials) by spaceID
router.get('/:spaceID/responses', verifyToken, getResponses);

// Like/Unlike a testimonial
router.post('/:spaceID/testimonial/:testimonialID/like', verifyToken, toggleLike);

// Archive/Unarchive a testimonial
router.post('/:spaceID/testimonial/:testimonialID/archive', verifyToken, toggleArchive);
module.exports = router;
