require("dotenv").config();
const express = require("express");
const app = express();

const User = require("./models/User");
const GameStatus = require("./models/GameStatus");
const sequelize = require("./config/database");

const setAssociations = require("./models/associations");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const viewRoutes = require("./routes/viewRoutes");

const PORT = process.env.PORT || 4000;
app.use(express.json()); //json 바디를 처리하는 미들웨어

const initDatabase = async () => {
  try {
    await sequelize.authenticate();

    // await GameStatus.drop();
    // await User.drop();

    // await sequelize.sync();
    await sequelize.sync({ force: true });
    // await GameStatus.sync({ force: true });

    // await User.sync();
    // await GameStatus.sync();

    await User.create(
      {
        no: 1,
        id: "test1",
        name: "테스트1",
        password: "1234",
        coin: 0,
        GameStatus: {
          no: 1,
          waterGame: false,
          treeGame: false,
          lightGame: false,
        },
      },
      {
        include: [{ model: GameStatus, as: "GameStatus" }],
      }
    );

    await sequelize.sync();

    console.log("서버랑 붙음");
  } catch (error) {
    console.error("DB연결 실패", error);
  }
};

setAssociations();

app.use("/user", userRoutes);
app.use("/game", gameRoutes);
app.use("/", viewRoutes);

app.listen(PORT, () => {
  initDatabase();
  console.log(`Server is running on port ${PORT}`);
});
