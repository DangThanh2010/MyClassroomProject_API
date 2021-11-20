const express = require('express');
const router = express.Router();

const controller = require('./classController');

router.get('/', controller.listClass);

router.get('/:id', controller.getClass);

router.post('/', controller.addClass);

router.delete('/:id', controller.deleteClass);

module.exports = router;