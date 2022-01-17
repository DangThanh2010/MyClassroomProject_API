const { DataTypes } = require("sequelize");
const db = require("../../database");
const Review = db.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    gradeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gradeWant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    explaination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    final: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: "Review",
    timestamps: false,
  }
);

db.sync({ alter: true }).then(()=> console.log('Create reviewModel successfully'));;

module.exports = Review;
