const Review = require("./reviewModel");
const Grade = require("../grade/gradeModel");
const db = require("../../database");
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

module.exports.getAllReviewByGradeId = async (id) => {
  const review = await db.query(`select * 
  from public."Review" INNER JOIN public."Grade" ON "Review"."gradeId"="Grade"."id" INNER JOIN public."Assignment" ON "Grade"."AssignmentId"="Assignment"."id"
  WHERE "Review"."final" = false and "Grade"."ClassId"='${id}' order by "Review"."createdAt" DESC`);
  return review[0];
};


module.exports.getReview = async (id) => {
  return await Review.findOne({where: {id: id}});
}
module.exports.acceptReview = async (reviewId, gradeId, gradeNew) => {
  await Review.update(
    {
      final: true,
    },
    { where: { id: reviewId } }
  );
  await Grade.update(
    {
      point: gradeNew,
    },
    { where: { id: gradeId } }
  );
};