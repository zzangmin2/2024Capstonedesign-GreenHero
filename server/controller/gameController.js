const GameStatus = require("../models/GameStatus");

const gameController = {
  //전체 회원의 게임 현황 조회
  gameStatus: async (req, res) => {
    try {
      const gameStatus = await GameStatus.findAll();
      res.status(200).send(gameStatus);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = gameController;
