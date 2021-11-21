const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./avatarController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/test/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
});

router.post('/:id', upload.single('image'), controller.updateAvatar);
// router.post('/', controller.addUser);

// router.delete('/:id', controller.deleteUser);

module.exports = router;