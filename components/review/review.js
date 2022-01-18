const express = require('express');
const router = express.Router();
const controller = require('./reviewController');

router.get('/:gradeId', controller.getReviewByGradeId);

router.post('/', controller.addReview);
router.get('/getByClassId/:gradeId', controller.getAllReviewByGradeId);
router.post('/acceptReview', controller.acceptReview);
router.put('/refuseReview', controller.refuseReview);
module.exports = router;