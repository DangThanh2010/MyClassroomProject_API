const express = require('express');
const router = express.Router();

const controller = require('./assignmentController');

router.post('/:classId', controller.addAssignment);


module.exports = router;