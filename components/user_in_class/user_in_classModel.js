const { DataTypes } = require('sequelize');
const db = require('../../database');
const User = require('../users/userModel');
const Class = require('../class/classModel');
const UserinClass = db.define("UserinClass", {
  role: {
    type: DataTypes.INTEGER, // true: Teacher, false: Student
    allowNull: false,
  },
}, {
    tableName: 'UserinClass',
    timestamps: false
}); 
User.belongsToMany(Class,{through: UserinClass});
Class.belongsToMany(User, {through: UserinClass});

db.sync({ alter: true }).then(()=> console.log('Create userModel successfully'));

module.exports = User;