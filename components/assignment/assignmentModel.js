const { DataTypes } = require('sequelize');
const db = require('../../database');

const Assignment = db.define('Assignment', {
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
  point: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  ClassId: {
    type: DataTypes.INTEGER,
  },
  NO: {
    type: DataTypes.INTEGER,
  }

}, {
    tableName: 'Assignment',
    timestamps: false
}); 

db.sync({ alter: true });

module.exports = Assignment;