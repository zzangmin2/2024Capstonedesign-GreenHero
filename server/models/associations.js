const User = require("./User");
const GameStatus = require("./GameStatus");

function setAssociations() {
  User.hasOne(GameStatus, {
    foreignKey: "id",
    as: "GameStatus",
    onDelete: "CASCADE",
  });
  GameStatus.belongsTo(User, {
    foreignKey: "id",
    as: "User",
    onDelete: "CASCADE",
  });
}

User.afterCreate(async (user, options) => {
  try {
    await GameStatus.create({ id: user.id });
  } catch (error) {
    console.error("Failed to create game status for user:", error);
  }
});

module.exports = setAssociations;
