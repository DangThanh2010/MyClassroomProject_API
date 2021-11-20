const model = require('./userModel');
const db=require('../../database');
module.exports.findUser = async (email) => {
    const result = await model.findOne({ email: email });
    return result;
}
module.exports.getUser = async (id) => {
    const result = await model.findOne({ id: id });
    return result;
}

// module.exports.addUser = async (email, password, fullname, avatar, IDstudent) => {
//     await model.create({'email' : email, 'password' : password, 'fullname' : fullname, 'avatar' : avatar, 'IDstudent' : IDstudent});
// }

module.exports.deleteUser = async (id) => {
    await model.destroy({
        where: {
            id: id
        }
    })
}
module.exports.listUser = async () => {
    const result = await model.findAll();
    return result;
}
