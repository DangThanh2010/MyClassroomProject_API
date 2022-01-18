const Assignment = require('./assignmentModel');
const Grade = require('../grade/gradeModel');
const Class = require('../class/classModel');
const Review = require('../review/reviewModel');
const Comment = require('../comment/commentModel');

module.exports.addAssignment = async (classId, name, point) => {
  const cls = await Class.findOne({where: {id: classId}});
  const listAssignment = await Assignment.findAll({where: {ClassId: classId}});

  if(cls){
    if(listAssignment){
      await Assignment.create({
        name: name,
        point: point,
        ClassId: classId,
        NO: listAssignment.length
      });
      return true;
    }
    else{
      await Assignment.create({
        name: name,
        point: point,
        ClassId: classId,
        NO: 0
      });
      return true;
    }
  }
  else
    return false;
}

module.exports.deleteAssignment = async (id) => {
  const assignment = await Assignment.findOne({where: {id: id}});
  if(assignment){
    const listAssignment = await Assignment.findAll({where: {ClassId: assignment.ClassId}});
    if(listAssignment.length !== 1){
      for(let i = 0; i < listAssignment.length; i++){
        if(listAssignment[i].NO > assignment.NO){
          await Assignment.update(
            { NO: listAssignment[i].NO - 1},
            {where: {id: listAssignment[i].id}}
          );
        }
      }
    }
    const listGrade =  await Grade.findAll({where: {AssignmentId: assignment.id}});
    let listReview = [];
    for(let i = 0; i < listGrade.length; i++){
      listReview = listReview.concat(await Review.findAll({where: {gradeId: listGrade[i].id}}))
    }

    for(let i = 0; i < listReview.length; i++){
      await Comment.destroy({where: {reviewId: listReview[i].id}});
      await Review.destroy({where: {id: listReview[i].id}});
    }
    await Grade.destroy({
      where: {AssignmentId: assignment.id}
    });
    await Assignment.destroy({
      where: {id: assignment.id}
    });

    return true;
  }
  else 
    return false;
}

module.exports.listAssignment = async (classId) => {
    return await Assignment.findAll({where: {ClassId: classId}, order: [['NO', 'ASC']]});
}

module.exports.updateIndex = async (id, NO) => {
  return await Assignment.update({NO: NO}, {where: {id: id}});
}

module.exports.updateAssignment = async (id, content) => {
  return await Assignment.update({name: content.name, point:content.point}, {where: {id: id}});
}

module.exports.getAssignment = async (id) => {
  return await Assignment.findOne({where: {id: id}});
}

module.exports.getAssignmentByClassId = async (classId) => {
  return await Assignment.findAll({where: {ClassId: classId}});
}