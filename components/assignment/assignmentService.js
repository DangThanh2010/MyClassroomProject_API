const model = require('./assignmentModel');


module.exports = async function(id){
    await model.findAll({where: {ClassId: id}}).then((result) => {
        return result;
    })
}