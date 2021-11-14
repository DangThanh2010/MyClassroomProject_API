const service = require('./classService');

module.exports.listClass = async (req, res, next) => {
    const listClass = await service.listClass();
    res.json(listClass);
}

module.exports.addClass = async (req, res, next) => {
    if(req.body.name !== "" && req.body.name !== null && req.body.name !== undefined)
    {
        await service.addClass(req.body.name, req.body.subject);
        res.json('Create successful');
    }
    else
        res.json('Create unsuccessful');
}

module.exports.deleteClass = async (req, res, next) => {
    await service.deleteClass(parseInt(req.params.id));
    res.json('Delete successful');
}