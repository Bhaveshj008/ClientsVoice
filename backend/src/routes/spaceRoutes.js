const express = require('express');
const {saveSpace, generateFormConfig, deleteSpace, getCompleteSpace} = require('../controllers/spaceController');
const {verifyToken} = require('../middlewares/authMiddleware');
const {getStats, getResponses, toggleLike, toggleArchive, getSingleTestimonial} = require('../controllers/spaceDashboardController');

const router = express.Router();

// Route to create a new space
router.post('/createSpace', verifyToken, saveSpace);
router.put('/editSpace', verifyToken, saveSpace);

// Route to get all spaces for the authenticated client


// Route to generate form based on user input
router.post('/generate-form', verifyToken, generateFormConfig);




// Get total count of feedback and testimonials
router.get('/:spaceID/stats', verifyToken, getStats);

// Get all responses (feedback/testimonials) by spaceID
router.get('/:spaceID/responses', verifyToken, getResponses);

// Like/Unlike a testimonial
router.post('/:spaceID/testimonial/:testimonialID/like', toggleLike);
router.get('/:spaceID/testimonial/:testimonialID/like', toggleLike);

// Archive/Unarchive a testimonial
router.post('/:spaceID/testimonial/:testimonialID/archive', verifyToken, toggleArchive);

//get single testimonial for direct like
router.get('/testimonial/:testimonialID', getSingleTestimonial);

router.delete('/spaces/delete/:spaceID', verifyToken, deleteSpace);

router.get('/space/:spaceId', verifyToken, getCompleteSpace)
module.exports = router;
