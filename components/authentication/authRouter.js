const express = require('express');
const router = express.Router();

const controller = require('./authController');
const passport = require('passport');
const passportConfig = require('../../middleware/passport');

router.post('/login',passport.authenticate('local') ,controller.LoginWithLocal);
router.post('/register',controller.register);
router.post('/google',controller.ImportDataGoogle, controller.LoginWithGoogle);
router.post('/test', (req, res) => {
    res.json({
        success: false,
        message: 'Request Successfully!!!',
        data: req.body,
    });
});
//router.post('/register',)
module.exports = router;