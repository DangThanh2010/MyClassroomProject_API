const express = require('express');
const router = express.Router();
const controller = require('./commentController');
router.post('/', controller.addClass);
module.exports = router;