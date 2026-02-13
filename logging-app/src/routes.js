const express = require('express');
const router = express.Router();
const logController = require('./controller');

// Example route: GET /
router.post('/log', logController);

// Export the router
module.exports = router;