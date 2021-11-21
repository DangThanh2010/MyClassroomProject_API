const service = require("./authService");
const bcrypt = require("bcrypt");
const User = require("../users/userModel");
const { JWTSign } = require("../../middleware/jwt");

module.exports.register = async (req, res, next) => {
  const { email, password, IDstudent, fullname } = req.body;
  await service
    .IsExist(email)
    .then((user) => {
      if (user) {
        res.json({
          message: "Email already exists!!!",
          success: false,
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);
        const newUser = new User({
          email: email,
          password: hashpass,
          IDstudent: IDstudent,
          fullname: fullname,
        });
        newUser.save();
        const token = JWTSign(newUser._id, newUser.email);
        res.json({
          message: "Register successfully!!!",
          success: true,
          token: token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.ImportDataGoogle = async (req, res, next) => {
  const { profile } = req.body;
  const user = await User.findOne({
    where: { authGoogleID: profile.googleId, authType: "google" },
  });
  // Check user exist
  if (user) {
    req.user = user;
    next();
  } else {
    const newUser = new User({
      authType: "google",
      email: profile.email,
      avatar: profile.imageUrl,
      authGoogleID: profile.googleId,
      fullname: profile.familyName + " " + profile.givenName,
    });
    await newUser.save();
    req.user = user;
    next();
  }
};
module.exports.LoginWithGoogle = (req, res) => {
  res.json({
    message: "You already login with Google",
    user: req.user,
  });
};

module.exports.LoginWithLocal = (req, res) => {
  const token = JWTSign(req.user.id, req.user.email);
  res.json({
    message: "You already login with this email and password",
    user: req.user,
    token: token,
    expAt: new Date().getTime() + 43200000,
  });
};
