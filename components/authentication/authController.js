const service = require("./authService");
const bcrypt = require("bcrypt");
const User = require("../users/userModel");
const { JWTSign } = require("../../middleware/jwt");


module.exports.register = async (req, res, next) => {
  const { email, password, IDstudent, fullname } = req.body;
  await service.IsExist(email).then((user) => {
    if (user) {
      res.json({
        message: "Email already exists",
      });
    } else {
      const hashpass = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email: email,
        password: hashpass,
        IDstudent: IDstudent,
        fullname: fullname,
      });
      newUser.save();
      const token = JWTSign(newUser._id, newUser.email);
      res.json({
        message: "Success register",
        token: token,
      });
    }
  });
};
