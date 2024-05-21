const User = require("./User");
const GameStatus = require("./GameStatus");

function setAssociations() {
  User.hasOne(GameStatus, {
    foreignKey: "no",
    as: "GameStatus",
  });
  GameStatus.belongsTo(User, {
    foreignKey: "no",
    as: "User",
  });
}

module.exports = setAssociations;
