const service = require("./notificationService");

module.exports.listNotification = async (req, res, next) => {
  const list =  await service.listNotification(parseInt(req.params.userId));
  res.json(list);
}

module.exports.addNotification = async (req, res, next) => {
  await service.addNotification(
    req.body.userId,
    req.body.content,
    req.body.link
  );
  res.json({ success: true, message: "Add notification Successfully!" });
}

module.exports.watchedNotification = async (req, res, next) => {
  await service.watchedNotification(parseInt(req.params.id));
  res.json({ success: true, message: "Watch notification Successfully!" });
}