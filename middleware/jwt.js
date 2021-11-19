const jwt = require('jsonwebtoken');

module.exports.JWTSign = function(userID,email){
    return jwt.sign({id: userID, email: email}, process.env.SECRET_KEY,{ expiresIn: '12h' });
}