const { DataTypes } = require('sequelize');
const db = require('../../database');

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
    allowNull: false,
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
  }
}, {
    tableName: 'User',
    timestamps: false
}); 

db.sync({ alter: true }).then(()=> console.log('Create userModel successfully'));

module.exports = User;