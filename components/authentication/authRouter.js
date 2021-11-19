const express = require('express');
const router = express.Router();

const controller = require('./authController');
const passport = require('passport');
const passportConfig = require('../../middleware/passport');

router.post('/login',passport.authenticate('local') ,(req, res) => {
    res.json({
        message: 'You already login with this email and password',
        user: req.user,
    });
});
router.post('/register',controller.register);
router.get('/google',passport.authenticate('google-plus-token'), (req, res) => {
    res.json({
        message: 'You already login with Google',
        user: req.user
    })
});
//router.post('/register',)
module.exports = router;