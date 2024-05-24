const User = require("../models/User");
const GameStatus = require("../models/GameStatus");
const jwt = require("jsonwebtoken");

/**
 * jwt(로그인)
 */
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userController = {
  //회원조회
  user: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  //회원가입
  signUp: async (req, res) => {
    const { id, password, name } = req.body;
    try {
      const result = await User.create(
        {
          id,
          password,
          name,
          coin: 0,
          GameStatus: {
            waterGame: false,
            treeGame: false,
            lightGame: false,
            trashGame: false,
          },
        },
        {
          include: [{ model: GameStatus, as: "GameStatus" }],
        }
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("에러발생");
    }
  },
  //회원가입 시 중복 아이디 조회
  confirmDuplicatedId: async (req, res) => {
    const { id } = req.body;

    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        res.status(200).send("중복된 아이디 있음");
      } else {
        res.status(200).send("중복된 아이디 없음");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("에러발생");
    }
  },
  //로그인
  logIn: async (req, res) => {
    const { id, password } = req.body;
    const users = await User.findAll();
    const user = users.find(
      (user) => user.id === id && user.password === password
    );
    if (user) {
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        expiresIn: "3h",
      });
      res.json({ accessToken });
    } else {
      res.status(401).send("로그인 실패");
    }
  },
  // [메인 화면] 현재 접속 사용자의 이름 및 코인 조회
  getUserInfo: async (req, res) => {
    //header의 accesstoken 가져오기
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(400).json({ message: "Accesstoken이 없습니다." });
    }

    try {
      // JWT 디코딩
      const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      // 사용자의 이름과 코인을 반환
      res.json({ name: user.name, coin: user.coin });
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      res.status(500).json({ message: "사용자 정보 조회에 실패했습니다." });
    }
  },
};

module.exports = userController;
