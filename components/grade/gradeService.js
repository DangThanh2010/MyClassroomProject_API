const fs = require("fs");
const csv = require("csv-parser");
const nodemailer = require("nodemailer");
const Grade = require("./gradeModel");
const db = require("../../database");
const Assignment = require("../assignment/assignmentModel");
const UserModel = require("../users/userModel");
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
    await Grade.update({ point: data.point }, { where: { id: grade.id } });
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
module.exports.markDoneGradeColumn = async (classId, assignmentId) => {
  const grade = await Grade.findAll({
    where: {
      ClassId: classId,
      AssignmentId: assignmentId,
    },
  });
  console.log(grade);
  let temp = [];
  if (grade.length !== 0) {
    for (let i = 0; i < grade.length; i++) {
      // temp.push({ studentId: grade[i].IdStudent });
      console.log("grade[i].IdStudent", grade[i].studentId);
      const { email } = await UserModel.findOne({
        where: {
          IDstudent: grade[i].studentId,
        },
        attributes: ["email"],
      });
      if (email) {
        console.log("emailUser", email);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "ĐIỂM SỐ BÀI TẬP",
          text: "Điểm số của bạn là:" + grade[i].point,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            // res.json({ result: 0 });
          } else {
            console.log("Email sent: " + info.response);
            // res.json({ result: 1 });
            console.log("da gui mail");
          }
        });
      }
    }
  }
  // console.log("temp", temp);
  // if (grade) {
  //   await Grade.update(
  //     { point: data.point },
  //     { where: { id: grade.id } }
  //   );
  // } else {
  //   await Grade.create({
  //     studentId: data.studentId,
  //     fullName: data.fullName,
  //     point: data.point,
  //     AssignmentId: data.assignmentId,
  //     ClassId: classId,
  //   });
  // }
};
