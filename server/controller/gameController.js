const User = require("../models/User");
const GameStatus = require("../models/GameStatus");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

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

  //게임 성공 시 코인 숫자 증가
  updateCoinCount: async (req, res) => {
    //header의 accesstoken 가져오기
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(400).json({ message: "Accesstoken이 없습니다." });
    }

    try {
      // JWT 디코딩
      const decoded = jwt.verify(accessToken, SECRET_KEY);

      // 사용자 찾기
      const user = await User.findOne({ where: { id: decoded.id } });

      // 코인 숫자 증가
      user.coin += 1;

      // 새로운 JWT 생성 (업데이트된 사용자 정보 포함)
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        expiresIn: "3h",
      });
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: "코인 증가 실패" });
    }
  },

  // 게임 성공 시 해당 게임 상태 변경
  updateUserGameStatus: async (req, res) => {
    const { gameName } = req.body;
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(400).json({ message: "Accesstoken이 없습니다." });
    }

    const token = accessToken.split(" ")[1];
    console.log(token);

    try {
      // JWT 디코딩
      const decoded = jwt.verify(token, SECRET_KEY);

      console.log(decoded);
      // 회원 정보 가져오기
      const userId = decoded.id;

      console.log(userId);
      // 해당 게임 상태를 업데이트
      let updatedGameStatus = await GameStatus.findOne({ id: { userId } });
      if (!updatedGameStatus) {
        return console.log("오류발생오류발생아이디가없는오류");
      }

      console.log(updatedGameStatus);

      // 해당 게임 상태를 true로 업데이트
      switch (gameName) {
        case "waterGame":
          updatedGameStatus.waterGame = true;
          break;
        case "treeGame":
          updatedGameStatus.treeGame = true;
          break;
        case "lightGame":
          updatedGameStatus.lightGame = true;
          break;
        case "trashGame":
          updatedGameStatus.trashGame = true;
          break;
        default:
          return res.status(400).json({ message: "잘못된 게임 이름입니다." });
      }

      await updatedGameStatus.save();

      // 응답
      res.json({ message: "게임 상태저장 성공" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = gameController;
