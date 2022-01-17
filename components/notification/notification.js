const express = require('express');
const router = express.Router();
const controller = require('./notificationController');

router.get('/:userId', controller.listNotification);

router.post('/', controller.addNotification);

router.get('/watched/:id', controller.watchedNotification);

module.exports = router;