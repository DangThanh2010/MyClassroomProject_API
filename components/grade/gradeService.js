const Grade = require("./gradeModel");

module.exports.listGrade = async (classId) => {
  const result = await Grade.findAll({where: {ClassId: classId}, order: [['studentId', 'ASC'], ['AssignmentId', 'ASC']]});
  return result;
};
module.exports.updateGrade = async (id,point) => {
  await Grade.update({point: point}, {where: {id: id}})
}