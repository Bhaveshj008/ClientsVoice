const express = require('express');
const router = express.Router();
const {GetForm} = require('../controllers/GetForm');
const {submitFormData} = require('../controllers/formResponseController');


router.get('/form/:spaceName', GetForm);
router.post('/form/submit', submitFormData);

module.exports = router;
