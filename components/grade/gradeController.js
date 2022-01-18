const { set } = require("../../app");
const service = require("./gradeService");
const userService = require("../users/userService");
const assignmentService = require("../assignment/assignmentService");

module.exports.listGrade = async function (req, res, next) {
  const listgrade = await service.listGrade(parseInt(req.params.classId));

  if (listgrade.length === 0) {
    res.json({
      data: null,
      message: "Successfully!!!",
    });
  } else {
    res.json({
      data: listgrade,
      message: "Successfully!!!",
    });
  }
};

module.exports.listGradeForStudent = async function (req, res, next) {
  console.log(req.query.studentId);
  
  const listgrade = await service.listGradeForStudent(parseInt(req.params.classId), req.query.studentId);
  let result = [];
  for(let i = 0; i < listgrade.length; i++){
    const assignment = await assignmentService.getAssignment(listgrade[i].AssignmentId);
    result.push({grade: listgrade[i], assignment: assignment});
  }
  
  const student = await userService.findUserByIDStudent(req.query.studentId);

  res.json({
    data: result,
    student: student,
    message: "Successfully!!!",
  });
  
};

module.exports.addStudentListForClass = async (req, res, next) => {
  await service.addStudentListForClass(req.params.classId, req.file.path);
  res.json({ success: true, message: "Add list student Successfully!" });
};

module.exports.addGradeListForAssignment = async (req, res, next) => {
  await service.addGradeListForAssignment(
    req.params.classId,
    req.body.assignmentId,
    req.file.path
  );
  res.json({ success: true, message: "Add list grade Successfully!" });
};

module.exports.updateGrade = async function (req, res, next) {
  const { id, point } = req.body;
  console.log(req.body);
  await service.updateGrade(id, point);
  res.json({ success: true, message: "Update Successfully!" });
};

module.exports.UpdateOrCreateGrade = async function (req, res, next) {
  console.log(req.body);
  await service.updateorcreateGrade(req.params.id, req.body);
  res.json({ success: true, message: "Update Successfully!" });
};

module.exports.markDoneGradeColumn = async function (req, res, next) {
  try {
    const { assignmentId } = req.body;
    const classId = req.params.classId;

    const result = await service.markDoneGradeColumn(classId, assignmentId);
    if (result === 1)
      res.json({
        status: 1,
        msg: "Đã gửi mail thông báo điểm cho các sinh viên đã có điểm.",
      });
    else
      res.json({
        status: -1,
        msg: "Cột điểm này trống, vui lòng nhập điểm.",
      });
  } catch (error) {
    res.json({
      status: -1,
      msg: "Hiện tại chưa thể gửi mail. Vui lòng thử lại.",
    });
  }
};
module.exports.finishAll = async function (req, res, next) {
  const { idClass } = req.body;
  await service.finishAll(idClass);
  res.json({ success: true, message: "Hoàn thành!" });
};
