const express = require('express');
const router = express.Router();

const controller = require('./userController');
router.get('/:id', controller.getUser);
router.get('/', controller.listUser);

router.post('/:id', controller.editUserInfo);

router.get('/myself/get', controller.getMyself);

router.post('/myself/mapping', controller.mappingAccount);
// router.post('/', controller.addUser);

// router.delete('/:id', controller.deleteUser);

module.exports = router;