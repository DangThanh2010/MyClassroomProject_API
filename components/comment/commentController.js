const { set } = require("../../app");
const service = require("./commentServices");
module.exports.addClass = async (req, res, next) => {
    if(1)
    {
        await service.addClass();
        res.json('Create successful');
    }
    else
        res.json('Create unsuccessful');
}
