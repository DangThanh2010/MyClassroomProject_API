const service = require('./userService');

module.exports.getUser = async (req, res, next) => {
    const getUser = await service.getUser(parseInt(req.params.id));
    res.json(getUser);
}
module.exports.listUser = async (req, res, next) => {
    const listUser = await service.listUser();
    res.json(listUser);
}
