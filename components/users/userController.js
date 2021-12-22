const service = require("./userService");
const bcrypt = require("bcrypt");

module.exports.getUser = async (req, res, next) => {
  const getUser = await service.getUser(parseInt(req.params.id));
  res.json(getUser);
};

module.exports.listUser = async (req, res, next) => {
  const listUser = await service.listUser();
  res.json(listUser);
};

module.exports.getByStudentId = async (req, res, next) => {
  const result = await service.getByStudentId(req.params.studentId);
  if(result) {
    res.json({success: true, result: result});
  }
  else{
    res.json({success: false, result: result});
  }
};

module.exports.editUserInfo = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const info = {
      fullname: req.body.name || "",
    };
    const user = await service.editUserInfo(id, info);
    if (user) {
      res.json({ status: 1, msg: "Success", user: user });
    } else {
      res.json({ status: -1, msg: "Failed" });
    }
  } catch (error) {
    console.log(error);
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
      res.json({ status: 1, msg: "Cập nhật thành công", user: user });
    } else {
      res.json({ status: -1, msg: "Cập nhật thất bại. Vui lòng thử lại" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMyself = async (req, res, next) => {
  if (req.user) {
    const result = await service.getUser(req.user.id);
    res.json(result);
  } else {
    res.json({});
  }
};

module.exports.mappingAccount = async (req, res, next) => {
  if (req.user && req.body.idStudent) {
    const haveUser = await service.findUserByIDStudent(req.body.idStudent);
    if (haveUser) {
      res.json({ result: 0 });
    } else {
      const result = await service.editIdStudent(
        req.user.id,
        req.body.idStudent
      );
      if (result) res.json({ result: 1 });
      else res.json({ result: -1 });
    }
  } else res.json({ result: -1 });
};

module.exports.changePassword = async (req, res, next) => {
  if (req.user) {
    const user = await service.getUser(req.user.id);
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      const salt = bcrypt.genSaltSync(10);
      const newpass = bcrypt.hashSync(req.body.newPassword, salt);

      const result = await service.updatePassword(req.user.id, newpass);
      if (result)
        res.json({
          status: 1,
          msg: "Cập nhật mật khẩu thành công",
          user: result,
        });
    } else {
      res.json({
        status: -1,
        msg: "Mật khẩu bạn nhập không đúng. Vui lòng thử lại.",
      });
    }
  }
};
