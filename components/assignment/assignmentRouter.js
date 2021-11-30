const express = require('express');
const router = express.Router();

const controller = require('./assignmentController');

router.post('/updateIndex', controller.updateIndex);

router.post('/:classId', controller.addAssignment);

router.delete('/:id', controller.deleteAssignment);

router.get('/:classId', controller.listAssignment);




module.exports = router;