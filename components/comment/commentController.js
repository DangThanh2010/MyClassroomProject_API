const { set } = require("../../app");
const service = require("./commentServices");
const reviewService = require("../review/reviewService");
const gradeService = require("../grade/gradeService");
const assignmentService = require("../assignment/assignmentService");
module.exports.addClass = async (req, res, next) => {
    if(1)
    {
        await service.addClass();
        res.json('Create successful');
    }
    else
        res.json('Create unsuccessful');
}

module.exports.listCommentByReviewId = async (req, res, next) => {
    const comments = await service.listCommentByReviewId(parseInt(req.params.reviewId));
    const review = await reviewService.getReview(parseInt(req.params.reviewId));
    let grade = null;
    let assignment = null;
    if(review){
        grade = await gradeService.getGrade(parseInt(review.gradeId));
        if(grade){
            assignment = await assignmentService.getAssignment(parseInt(grade.AssignmentId));
            if(assignment){
                res.json({
                    comments: comments,
                    review: review,
                    grade: grade,
                    assignment: assignment,
                    result: 1
                })
            }else{
                res.json({
                    result: 0
                })
            }
        } else {
            res.json({
                result: 0
            })
        }
    }else {
        res.json({
            result: 0
        })
     };
}
