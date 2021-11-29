const express = require('express');
const router = express.Router();

const controller = require('./assignmentController');

router.post('/:classId', controller.addAssignment);

router.delete('/:id', controller.deleteAssignment);

router.get('/:classId', function (req, res){
        
});




module.exports = router;