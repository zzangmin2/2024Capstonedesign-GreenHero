require("dotenv").config();
const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker/locale/ko");

const User = require("./models/User");
const GameStatus = require("./models/GameStatus");
const sequelize = require("./config/database");

const setAssociations = require("./models/associations");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const viewRoutes = require("./routes/viewRoutes");

const PORT = process.env.PORT || 8000;
app.use(express.json()); //json 바디를 처리하는 미들웨어

const initDatabase = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: true });

    for (let i = 0; i < 10; i++) {
      await User.create({
        id: `test${i}`,
        name: faker.person.lastName() + faker.person.firstName(),
        password: faker.internet.password(),
        coin: 0,
      });
    }

    await sequelize.sync();

    console.log("서버랑 붙음");
  } catch (error) {
    console.error("DB연결 실패", error);
  }
};

/**
 * 관계 설정
 */
setAssociations();

/**
 * 라우팅 설정
 */
app.use("/user", userRoutes);
app.use("/game", gameRoutes);
app.use("/", viewRoutes);

app.listen(PORT, () => {
  initDatabase();
  console.log(`Server is running on port ${PORT}`);
});
