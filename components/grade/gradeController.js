const { set } = require("../../app");
const service = require("./gradeService");

module.exports.listGrade = async function (req, res, next) {
  const listgrade = await service.listGrade(req.params.classId);
  res.json({
    data: listgrade,
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
    
    const result=await service.markDoneGradeColumn(classId, assignmentId);
    if(result===1)
    res.json({
      status: 1,
      msg: "Đã gửi mail thông báo điểm cho các sinh viên.",
    });
    else
    res.json({
      status: -1,
      msg: "Chưa nhập điểm cho cột này. Vui lòng nhập.",
    });
  } catch (error) {
    res.json({
      status: -1,
      msg: "Hiện tại chưa thể gửi mail. Vui lòng thử lại.",
    });
  }
};
