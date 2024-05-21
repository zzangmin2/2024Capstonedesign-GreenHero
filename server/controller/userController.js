const User = require("../models/User");
const GameStatus = require("../models/GameStatus");
const jwt = require("jsonwebtoken");

/**
 * jwt(로그인)
 */
const JWT_SECRET_KEY = "secretkey";

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
};

module.exports = userController;
