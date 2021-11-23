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
    
    const id = parseInt(req.params.id);
    try {
      const info = {
        fullname: req.body.name || "",
        // email: req.body.email || "",
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
  module.exports.postMyself = async (req, res, next) => {
    
    
    try {
      const info = {
        fullname: req.body.name || "",
        email: req.body.email || "",
      };
      const user = await service.editUserInfo(req.user.id, info);
      if (user) {
        res.json({ status: 1, msg: "Success", user: user });
      } else {
        res.json({ status: -1, msg: "Failed" });
      }
    } catch (error) {
      console.log(error)
    }
  };

module.exports.getMyself = async (req, res, next) => {
  if(req.user){
    const result = await service.getUser(req.user.id);
    res.json(result);
  }
  else{
    res.json({});
  }
}

module.exports.mappingAccount = async (req, res, next) => {
  if(req.user && req.body.idStudent){
    const haveUser = await service.findUserByIDStudent(req.body.idStudent);
    if(haveUser)
    {
      res.json({result: 0});
    }
    else 
    {
      const result = await service.editIdStudent(req.user.id, req.body.idStudent)
      if(result)
        res.json({result: 1});
      else
        res.json({result: -1});
    }
  }
  else
    res.json({result: -1});
}