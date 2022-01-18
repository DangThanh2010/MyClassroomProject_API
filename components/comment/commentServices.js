const Comment = require("./commentModel");

module.exports.addComment = async (reviewId, isTeacher, comment) => {
  const cls = await Comment.create({
    reviewId: reviewId,
    isTeacher: isTeacher,
    comment: comment
  })
};


module.exports.listCommentByReviewId = async (reviewId) => {
  return await Comment.findAll({where: {reviewId: reviewId}});
}
