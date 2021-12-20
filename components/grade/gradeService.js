const Grade = require("./gradeModel");
const db = require("../../database");
const Assignment = require("../assignment/assignmentModel");
module.exports.listGrade = async (classId) => {
  // const result = await Grade.findAll({where: {ClassId: classId}, order: [['studentId', 'ASC'], ['AssignmentId', 'ASC']]});
  const result = await db.query(`SELECT g.id, g."studentId", g."fullName", g.point, g."AssignmentId", Ass.name
  FROM "Grade" as g join "Assignment" as Ass on g."AssignmentId" = Ass.id 
  ORDER BY "studentId" ASC, "AssignmentId" ASC`)
  return result;
};
module.exports.updateGrade = async (id,point) => {
  await Grade.update({point: point}, {where: {id: id}})
}