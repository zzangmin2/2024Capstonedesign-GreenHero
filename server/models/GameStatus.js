const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GameStatus = sequelize.define("GameStatus", {
  no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  waterGame: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  treeGame: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lightGame: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = GameStatus;
