const { set } = require('../../app');
const service = require('./gradeService');

module.exports.listGrade = async function (req, res, next) {
    const listgrade = await service.listGrade(req.params.classId);
    res.json({
        data: listgrade,
        message: 'Successfully!!!',
    });
}