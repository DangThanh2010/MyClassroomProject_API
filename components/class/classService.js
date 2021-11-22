const Class = require('./classModel');
const UserInClass = require('../user_in_class/user_in_classModel');
const User = require('../users/userModel');
module.exports.listClass = async (user) => {
    const result = await User.findByPk(user.id,{include: Class});
    return result;
}

module.exports.addClass = async (name, subject) => {
    await Class.create({'name' : name, 'subject' : subject});
}

async function deleteClass(id){
    await Class.destroy({
        where: {
            id: id
        }
    })
}

module.exports.removeClass = async (userID,classID) => {
    await UserInClass.findOne({where: {UserId: userID, ClassId: classID}}).then(result => {
        if(result){
            if(result.role === 2){
                UserInClass.destroy({where: {ClassId: classID}});
                Class.destroy({where: {id: classID}})
            }else{
                UserInClass.destroy({where: {UserId: userID, ClassId: classID}});
            }
        }
    });
}
module.exports.getClass = async (id) => {
    const result = await Class.findOne({
        where: {
            id: id
        },
    })
    return result;
}
module.exports.getRoleClass = async (classID,userID) => {
    const result = await UserInClass.findOne({
        where: {ClassId: classID, UserId: userID}
    });
    return result;
}


User.findOne({include: Class, where: {id : 4}}).then((result) => {
    console.log("\n data result",JSON.stringify(result[0]));
    
});