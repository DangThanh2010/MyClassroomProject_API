const { DataTypes } = require('sequelize');
const db = require('../../database');

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
  inviteLinkTeacher: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inviteLinkStudent: {
    type: DataTypes.STRING,
    allowNull: true,
  }

}, {
    tableName: 'Class',
    timestamps: false
}); 

db.sync({ alter: true });

module.exports = Class;