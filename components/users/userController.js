const service = require('./userService');

module.exports.getUser = async (req, res, next) => {
    const getUser = await service.getUser(parseInt(req.params.id));
    res.json(getUser);
}
module.exports.listUser = async (req, res, next) => {
    const listUser = await service.listUser();
    res.json(listUser);
}
module.exports.editUserInfo = async (req, res, next) => {
    console.log('req', req);
    const id = parseInt(req.params.id);
    try {
      const info = {
        fullname: req.body.name || "",
        email: req.body.email || "",
      };
      const user = await service.editUserInfo(id, info);
      if (user) {
        res.json({ status: 1, msg: "Success", user: user });
      } else {
        res.json({ status: -1, msg: "Failed" });
      }
    } catch (error) {
      console.log(error)
    }
  };
