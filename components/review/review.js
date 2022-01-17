const express = require('express');
const router = express.Router();
const controller = require('./reviewController');

router.get('/:gradeId', controller.getReviewByGradeId);

router.post('/', controller.addReview);

module.exports = router;