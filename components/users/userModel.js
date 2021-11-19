const { DataTypes } = require('sequelize');
const db = require('../../database');
const bcrypt = require('bcrypt');
const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  authType:{
    type: DataTypes.STRING,
    enum: ['local', 'google', 'facebook'],
    defaultValue: 'local',
  },
  authGoogleID:{
    type: DataTypes.STRING,
    defaultValue: null,
  },
  authFacebookID:{
    type: DataTypes.STRING,
    defaultValue: null,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IDstudent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}, {
    tableName: 'User',
    timestamps: false
});
// Class Method
// User.associate = function verifyPassword(password){
//   return bcrypt.compareSync(password,this.password);
// }
db.sync({ alter: true }).then(()=> console.log('Create userModel successfully'));

module.exports = User;