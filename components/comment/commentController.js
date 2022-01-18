const { set } = require("../../app");
const service = require("./commentServices");
const reviewService = require("../review/reviewService");
const gradeService = require("../grade/gradeService");
const userService = require("../users/userService");
const assignmentService = require("../assignment/assignmentService");

module.exports.addComment = async (req, res, next) => {
    await service.addComment(
        parseInt(req.body.reviewId),
        req.body.isTeacher,
        req.body.comment
      );
      res.json({ success: true, message: "Add comment Successfully!" });
}

module.exports.listCommentByReviewId = async (req, res, next) => {
    const comments = await service.listCommentByReviewId(parseInt(req.params.reviewId));
    const review = await reviewService.getReview(parseInt(req.params.reviewId));
    let grade = null;
    let assignment = null;
    if(review){
        grade = await gradeService.getGrade(parseInt(review.gradeId));
        if(grade){
            student = await userService.getByStudentId(grade.studentId);
            assignment = await assignmentService.getAssignment(parseInt(grade.AssignmentId));
            if(assignment && student){
                res.json({
                    comments: comments,
                    review: review,
                    grade: grade,
                    assignment: assignment,
                    student: student,
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
