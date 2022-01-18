const Review = require("./reviewModel");
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