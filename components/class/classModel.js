const { DataTypes } = require('sequelize');
const db = require('../../database');
function generateClassCode(length) {
  const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let result = "";
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const Class = db.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inviteCodeTeacher: {
    type: DataTypes.STRING,
    defaultValue: generateClassCode(8)
  },
  inviteCodeStudent: {
    type: DataTypes.STRING,
    defaultValue: generateClassCode(8)
  }

}, {
    tableName: 'Class',
    timestamps: false
}); 

db.sync({ alter: true });

module.exports = Class;