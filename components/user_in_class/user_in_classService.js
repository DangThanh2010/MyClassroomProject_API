const userInClassModel = require('./user_in_classModel');
const userModel = require('../users/userModel');

module.exports.getCreatorInClass = async (classId) => {
  const creatorId = await userInClassModel.findAll({
    where: {
      ClassId : classId,
      role: 2
    },
    attributes: ['UserId']
  });

  if(creatorId.length != 0)
    return await userModel.findAll({
      where: {
        id: creatorId[0].UserId,
      }
    });
  
  return [];
}

module.exports.getStudentInClass = async (classId) => {
  const studentId = await userInClassModel.findAll({
    where: {
      ClassId : classId,
      role: 0
    },
    attributes: ['UserId']
  });

  if(studentId.length != 0)
  {
    const result = [];
    for(let i = 0; i < studentId.length; i++)
    {
      const user = await userModel.findAll({
        where: {
          id: studentId[i].UserId,
        }
      });
      if(user.length != 0)
        result.push(user[0]);
    }
    return result;
  }
  return [];
}

module.exports.getTeacherInClass = async (classId) => {
  const teacherId = await userInClassModel.findAll({
    where: {
      ClassId : classId,
      role: 1
    },
    attributes: ['UserId']
  });

  if(teacherId.length != 0)
  {
    const result = [];
    for(let i = 0; i < teacherId.length; i++)
    {
      const user = await userModel.findAll({
        where: {
          id: teacherId[i].UserId,
        }
      });

      if(user.length != 0)
        result.push(user[0]);
    }
    return result;
  }
  return [];
}