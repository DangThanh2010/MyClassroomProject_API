const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../components/users/userModel");
const bcrypt = require("bcrypt");
// Google Token Strategy
// config in console.cloud.google
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID:
        "959295540823-84njq0si2t07n4631pc5odd5q1bfjk2u.apps.googleusercontent.com",
      clientSecret: "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",
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({'google.id': profile.id}, function(error, user) {
      //     return next(error, user);
      // });
      try {
        // console.log("accessToken ", accessToken);
        // console.log("refreshToken ", refreshToken);
        // console.log("profile ", profile);

        const user = await User.findOne({
          where: { authGoogleID: profile.id, authType: "google" },
        });
        // Check user exist
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            authType: 'google',
            email: profile.emails[0].value,
            avatar: profile.photos.value,
            authGoogleID: profile.id,
            fullname: profile.name.familyName + ' ' + profile.name.givenName,
          });
          await newUser.save();

          done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
// Local Strategy
passport.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password"},
  function(email, password, done) {
    console.log("email ", email);
    console.log("password ", password);
    User.findOne({ email: email }).then(user => {
      if(user){
        if(bcrypt.compareSync(password, user.password)){
          done(null, user);
        }else{
          done(null,false, {message: "Password mismatch with email"});
        }
      }else{
        done(null,false, {message: "Email not found"});
      }
    });
  }
));

// JWT Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwt_payload, done) {
      try {
        console.log(jwt_payload);
        const user = await new User.findOne({
          where: { email: jwt_payload.email },
        });
        if (user) return done(null, false);
        else return done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
// config serializeUser
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});