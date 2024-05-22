const User = require("./User");
const GameStatus = require("./GameStatus");

function setAssociations() {
  User.hasOne(GameStatus);
  GameStatus.belongsTo(User);
}

module.exports = setAssociations;
