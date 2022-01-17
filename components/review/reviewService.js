const Review = require("./reviewModel");

module.exports.getReviewByGradeId = async (gradeId) => {
  return await Review.findOne({where: {gradeId: gradeId}});
}

module.exports.addReview = async (gradeId, grandWant, explaination) => {
  
  await Review.create({
    gradeId: gradeId,
    gradeWant: grandWant,
    explaination: explaination,
  });
};