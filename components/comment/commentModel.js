const { DataTypes } = require("sequelize");
const db = require("../../database");
const Comment = db.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isTeacher: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Comment",
    timestamps: false,
  }
);

db.sync({ alter: true });

module.exports = Comment;
