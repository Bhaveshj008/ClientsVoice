const express = require('express');
const router = express.Router();
const {widget} = require('../controllers/WidgetController');


router.get('/:spaceID/embeddebleWidget', widget);
module.exports = router;