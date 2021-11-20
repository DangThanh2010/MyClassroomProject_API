const service = require('./user_in_classService');

module.exports.listUserInClass = async (req, res, next) => {
  if(req.query.role == "Creator")
  {
    const result = await service.getCreatorInClass(req.params.classId);
    res.json(result);
  }
  else if(req.query.role == "Teacher")
  {
    const result = await service.getTeacherInClass(req.params.classId);
    res.json(result);
  }
  else if(req.query.role == "Student")
  {
    const result = await service.getStudentInClass(req.params.classId);
    res.json(result);
  }
}