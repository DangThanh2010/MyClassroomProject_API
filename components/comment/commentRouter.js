const express = require('express');
const router = express.Router();
const controller = require('./commentController');

router.post('/', controller.addClass);

router.get('/:reviewId', controller.listCommentByReviewId)

module.exports = router;