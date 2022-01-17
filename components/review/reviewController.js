const service = require("./reviewService");

module.exports.getReviewByGradeId = async (req, res, next) => {
  const review =  await service.getReviewByGradeId(req.params.gradeId);
  if(review){
    res.json({
      review: review,
      result: 1
    })
  } else {
    res.json({
      review: review,
      result: 0
    })
  }
}

module.exports.addReview = async (req, res, next) => {
  await service.addReview(
    req.body.gradeId,
    parseInt(req.body.gradeWant),
    req.body.explaination
  );
  res.json({ success: true, message: "Add review Successfully!" });
}
module.exports.getClass = async (req, res, next) => {
  const result = await service.getReview(parseInt(req.params.id));
  if(result){
      res.json(result);
  }
  else{
      res.json({"id": -1});
  }
}