const service = require('./assignmentService');

module.exports.addAssignment = async (req, res, next) => {
  if(req.params.classId && req.body.name !== "" && req.body.name !== null && req.body.name !== undefined &&
    req.body.point !== "" && parseInt(req.body.point) !== null && parseInt(req.body.point) !== undefined)
  {
    const result = await service.addAssignment(parseInt(req.params.classId), req.body.name, parseInt(req.body.point));
    if(result)
      res.json('Create successful');
    else
      res.json('Create unsuccessful');
  }
  else
      res.json('Create unsuccessful');
}

module.exports.deleteAssignment = async (req, res, next) => {
  if(req.params.id)
  {
    const result = await service.deleteAssignment(parseInt(req.params.id));
    if(result)
      res.json('Delete successful');
    else
      res.json('Delete unsuccessful');
  }
  else
      res.json('Delete unsuccessful');
}

module.exports.listAssignment = async (req, res, next) => {
    // if(req.user){
    //     const result = await service.listAssignment(req.params.classId);
    //     res.json(result);
    // }
    // else 
    //     res.json();

    const result = await service.listAssignment(req.params.classId);
        res.json(result);

}