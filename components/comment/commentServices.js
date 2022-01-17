const Comment = require("./commentModel");
const Review = require("../review/reviewModel");
module.exports.addClass = async () => {
  const cls = await Review.create();
};


module.exports.listCommentByReviewId = async (reviewId) => {
  return await Comment.findAll({where: {reviewId: reviewId}});
}
