const Assignment = require('./assignmentModel');
const Class = require('../class/classModel');

module.exports.addAssignment = async (classId, name, point) => {
  const cls = await Class.findOne({where: {id: classId}});
  const listAssignment = await Assignment.findAll({where: {ClassId: classId}});

  if(cls){
    if(listAssignment){
      await Assignment.create({
        name: name,
        point: point,
        ClassId: classId,
        NO: listAssignment.length + 1
      });
      return true;
    }
    else{
      await Assignment.create({
        name: name,
        point: point,
        ClassId: classId,
        NO: 1
      });
      return true;
    }
  }
  else
    return false;
}

module.exports.listAssignment = async (id) => {
    return await model.findAll({where: {ClassId: id}});
}