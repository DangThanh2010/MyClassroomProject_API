const model = require('./classModel');

module.exports.listClass = async () => {
    const result = await model.findAll();
    return result;
}

module.exports.addClass = async (name, subject) => {
    await model.create({'name' : name, 'subject' : subject});
}

module.exports.deleteClass = async (id) => {
    await model.destroy({
        where: {
            id: id
        }
    })
}
module.exports.getClass = async (id) => {
    const result = await model.findOne({
        where: {
            id: id
        }
    })
    return result;
}