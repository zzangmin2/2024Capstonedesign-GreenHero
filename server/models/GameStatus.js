const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GameStatus = sequelize.define("GameStatus", {
  no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  waterGame: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  treeGame: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lightGame: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  trashGame: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GameStatus;
