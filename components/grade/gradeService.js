const fs = require("fs");
const csv = require("csv-parser");

const Grade = require("./gradeModel");
const db = require("../../database");
const Assignment = require("../assignment/assignmentModel");

module.exports.listGrade = async (classId) => {
  // const result = await Grade.findAll({where: {ClassId: classId}, order: [['studentId', 'ASC'], ['AssignmentId', 'ASC']]});
  const result =
    await db.query(`SELECT g.id, g."studentId", g."fullName", g.point, g."AssignmentId", Ass.name
  FROM "Grade" as g join "Assignment" as Ass on g."AssignmentId" = Ass.id 
  ORDER BY "studentId" ASC, "AssignmentId" ASC`);
  return result;
};

module.exports.addStudentListForClass = async (classId, filePath) => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (data) => {
      const grade = await Grade.findAll({
        where: { studentId: data.StudentId, ClassId: classId },
      });
      const assignment = await Assignment.findAll({
        where: { ClassId: classId },
      });
      if (grade.length !== 0) {
        for (let i = 0; i < grade.length; i++) {
          await Grade.update(
            { fullName: data.Fullname },
            { where: { id: grade[i].id } }
          );
        }

        for (let i = 0; i < assignment.length; i++) {
          let temp = 0;
          for (let j = 0; j < grade.length; j++) {
            if (grade[j].AssignmentId === assignment[i].id) {
              temp++;
            }
          }
          if (temp === 0) {
            await Grade.create({
              studentId: data.StudentId,
              fullName: data.Fullname,
              point: null,
              AssignmentId: assignment[i].id,
              ClassId: classId,
            });
          }
        }
      } else {
        for (let i = 0; i < assignment.length; i++) {
          await Grade.create({
            studentId: data.StudentId,
            fullName: data.Fullname,
            point: null,
            AssignmentId: assignment[i].id,
            ClassId: classId,
          });
        }
      }
    })
    .on("end", () => {
      fs.unlinkSync(filePath);
    });
};

module.exports.addGradeListForAssignment = async (
  classId,
  assignmentId,
  filePath
) => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (data) => {
      const grade = await Grade.findOne({
        where: {
          studentId: data.StudentId,
          ClassId: classId,
          AssignmentId: assignmentId,
        },
      });
      if (grade) {
        await Grade.update({ point: data.Point }, { where: { id: grade.id } });
      } else {
        const info = await Grade.findOne({
          where: { studentId: data.StudentId, ClassId: classId },
        });
        if (info) {
          await Grade.create({
            studentId: data.StudentId,
            fullName: info.fullName,
            point: data.Point,
            AssignmentId: assignmentId,
            ClassId: classId,
          });
        } else {
          await Grade.create({
            studentId: data.StudentId,
            fullName: null,
            point: data.Point,
            AssignmentId: assignmentId,
            ClassId: classId,
          });
        }
      }
    })
    .on("end", () => {
      fs.unlinkSync(filePath);
    });
};

module.exports.updateorcreateGrade = async (classId, data) => {
  const grade = await Grade.findOne({
    where: {
      studentId: data.studentId,
      ClassId: classId,
      AssignmentId: data.assignmentId,
    },
  });
  console.log(grade);
  if (grade) {
    await Grade.update(
      { point: data.point },
      { where: { id: grade.id } }
    );
  } else {
    await Grade.create({
      studentId: data.studentId,
      fullName: data.fullName,
      point: data.point,
      AssignmentId: data.assignmentId,
      ClassId: classId,
    });
  }
};
