const Notification = require("./notificationModel");

module.exports.listNotification = async (id) => {
  return await Notification.findAll({
    where: {userId: id},
    order: [
      ["createdAt", "DESC"],
    ],
  });
}

module.exports.addNotification = async (userId, content, link) => {
  
  await Notification.create({
    userId: userId,
    content: content,
    link: link,
  });
};

module.exports.watchedNotification = async (id) => {
  await Notification.update({isNew: false}, {where: {id: id}});
}