const model = require('../users/userModel');

module.exports.IsExist = async (email) => {
    const result = await model.findOne({where: {email: email}});
    return result;
}

module.exports.register = async (data) => {
    await data.save();
    // await model.create({'email' : data.email, 'password' : data.password, 'fullname': data.fullname, 'IDstudent': data.IDstudent});
}
