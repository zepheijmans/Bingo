const express = require('express');
const router = express.Router();

const classicController = require('../controllers/classic.controller');

router.get('/', classicController.index);
router.get('/generate', classicController.generate);
router.post('/clear', classicController.clear);

module.exports = router;
