const controller = require('./gradeController')
const express = require('express');

const router = express.Router();

router.get('/:classId', controller.listGrade);
router.put('/', controller.updateGrade)
module.exports = router;