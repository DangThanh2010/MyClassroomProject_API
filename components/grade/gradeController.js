const { set } = require('../../app');
const service = require('./gradeService');

module.exports.listGrade = async function (req, res, next) {
    const listgrade = await service.listGrade(req.params.classId);
    res.json({
        data: listgrade,
        message: 'Successfully!!!',
    });
}

module.exports.addStudentListForClass = async (req, res, next) => {
    
    await service.addStudentListForClass(req.params.classId, req.file.path);
    res.json({success: true, message: 'Add list student Successfully!'});
}

module.exports.addGradeListForAssignment = async (req, res, next) => {
    
    await service.addGradeListForAssignment(req.params.classId, req.body.assignmentId, req.file.path);
    res.json({success: true, message: 'Add list grade Successfully!'});
}

module.exports.updateGrade = async function (req, res, next) {
    const {id,point} = req.body;
    console.log(req.body);
    await service.updateGrade(id, point);
    res.json({success: true, message: 'Update Successfully!'});
}