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
module.exports.getAllReviewByGradeId = async (req, res, next) => {
  console.log('req', req.params.gradeId)
  const result = await service.getAllReviewByGradeId(parseInt(req.params.gradeId));
  if(result){
    console.log('result', result);
      res.json(result);
  }
  else{
      res.json({"id": -1});
  }
}
module.exports.acceptReview = async (req, res, next) => {
  await service.acceptReview(
    req.body.id,
    req.body.gradeId,
    parseInt(req.body.gradeNew),
    
  );
  res.json({ success: true, message: "Chấp nhận review thành công!" });
}
module.exports.refuseReview = async (req, res, next) => {
  await service.refuseReview(req.body.id);
  res.json({ success: true, message: "Từ chối review thành công!" });
}
