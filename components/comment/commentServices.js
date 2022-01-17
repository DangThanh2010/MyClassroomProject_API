const Comment = require("./commentModel");
const Review = require("../review/reviewModel")
module.exports.addClass = async () => {
  const cls = await Review.create();
};
