const express = require('express');
const router = express.Router();

const controller = require('./user_in_classController');

router.get('/:classId', controller.listUserInClass);

module.exports = router;