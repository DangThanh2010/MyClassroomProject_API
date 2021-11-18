const model = require('./userModel');

module.exports.listUser = async () => {
    const result = await model.findAll();
    return result;
}

module.exports.addUser = async (email, password, fullname, avatar, IDstudent) => {
    await model.create({'email' : email, 'password' : password, 'fullname' : fullname, 'avatar' : avatar, 'IDstudent' : IDstudent});
}

module.exports.deleteClass = async (id) => {
    await model.destroy({
        where: {
            id: id
        }
    })
}