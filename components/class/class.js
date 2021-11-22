const express = require('express');
const router = express.Router();

const controller = require('./classController');

router.get('/', controller.listClass);

router.get('/:id', controller.getClass);

router.get('/:id/role', controller.getRoleClass);
router.post('/', controller.addClass);

router.delete('/:id', controller.deleteClass);

router.post('/:id/invite', controller.sendEmailInvite);

router.post('/test', controller.deleteClass);
module.exports = router;