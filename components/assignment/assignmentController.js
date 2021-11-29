const service = require('./assignmentService');

module.exports.listAssignment = async (req, res, next) => {
    if(req.user){
        const result = await service.listAssignment(req.params.id);
        res.json(result);
    }
    else 
        res.json();

}