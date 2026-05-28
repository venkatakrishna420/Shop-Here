const express = require('express');
const { processPayment } = require('../controllers/payment.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Apply auth middleware to all payment routes
router.use(authenticate);

router.post('/process', processPayment);

module.exports = router;
