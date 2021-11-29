const express = require('express');
const router = express.Router();

const controller = require('./assignmentController');

router.post('/:classId', controller.addAssignment);

router.get('/:id', function (req, res){
        
});




module.exports = router;