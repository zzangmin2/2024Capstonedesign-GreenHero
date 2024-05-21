require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

const PORT = process.env.PORT || 4000;
app.use(express.json()); //json 바디를 처리하는 미들웨어

/**
 * DB
 */
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "test",
});

console.log(process.env.DB_HOST);
const User = sequelize.define("User", {
  no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

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

//외래키 설정
User.hasOne(GameStatus);
GameStatus.belongsTo(User);

//기본 DB
const initDatabase = async () => {
  try {
    await sequelize.authenticate();

    // await GameStatus.drop();
    // await User.drop();

    await sequelize.sync({ force: true });
    // await GameStatus.sync({ force: true });

    // await User.sync();
    // await GameStatus.sync();

    // await User.create(
    //   {
    //     no: 1,
    //     id: "test1",
    //     name: "테스트1",
    //     password: "1234",
    //     coin: 0,
    //     GameStatus: {
    //       no: 1,
    //       waterGame: false,
    //       treeGame: false,
    //       lightGame: false,
    //     },
    //   },
    //   {
    //     include: [GameStatus],
    //   }
    // );

    await sequelize.sync();

    console.log("서버랑 붙음");
  } catch (error) {
    console.error("DB연결 실패", error);
  }
};

/**
 * jwt(로그인)
 */
const JWT_SECRET_KEY = "secretkey";

//토큰 검증 미들웨어 함수
const tokenAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!authHeader || !token) {
    return res.status(403).send("비정상 접근입니다.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("정상적이지 않은 토큰");
  }
  next();
};

/**
 * 회원가입
 *  아이디, 비밀번호, 이름
 */
app.post("/signup", async (req, res) => {
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
        },
      },
      {
        include: [GameStatus],
      }
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("에러발생");
  }
});

/**
 * 회원가입 시 아이디 중복 확인
 */
app.post("/signup/confirmduplicateid", async (req, res) => {
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
});

/**
 * 회원 조회
 */
app.get("/user", async (req, res) => {
  const result = await User.findAll();
  res.send(result);
});

/**
 * 회원의 게임 현황조회
 */
app.get("/gamestatus", async (req, res) => {
  const result = await GameStatus.findAll();
  res.send(result);
});

/**
 * 로그인
 */
app.post("/login", async (req, res) => {
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
});

/**
 * get 요청 (페이지 이동)
 */
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "logIn", "index.html"));
});

// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "signUp", "index.html"));
// });

app.get("/light", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "light.html"));
});

app.get("/water", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "water", "index.html"));
});

app.get("/tree", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "treeAndAnimals", "index.html")
  );
});

app.listen(PORT, () => {
  initDatabase();
  console.log(`Server is running on port ${PORT}`);
});
