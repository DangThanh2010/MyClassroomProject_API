const service = require('./assignmentService');

module.exports.addAssignment = async (req, res, next) => {
  if(req.params.classId && req.body.name !== "" && req.body.name !== null && req.body.name !== undefined &&
    req.body.point !== "" && parseFloat(req.body.point) !== null && parseFloat(req.body.point) !== undefined)
  {
    const result = await service.addAssignment(parseInt(req.params.classId), req.body.name, parseFloat(req.body.point));
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
    const result = await service.listAssignment(req.params.classId)
    res.json(result);
}

module.exports.updateIndex = async (req, res) => {
  const idxAssignment = req.body.data;

  Promise.all(idxAssignment.map(async (item, index)=>{
    return await service.updateIndex(item.id,item.NO);
  })).then(function(result){        
    res.status(200).json({message: "successfully"});
    }).catch(function(err){
    res.status(500).json(err);
    }) 
}