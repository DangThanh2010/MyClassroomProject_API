const { DataTypes } = require('sequelize');
const db = require('../../database');

const Grade = db.define('Grade', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    tableName: 'Grade',
    timestamps: false
}); 

db.sync({ alter: true });

module.exports = Grade;