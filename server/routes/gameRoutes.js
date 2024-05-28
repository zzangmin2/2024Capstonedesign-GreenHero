const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

//전체 회원의 게임 현황 조회
router.get("/gamestatus", gameController.gameStatus);

//게임 성공 시 코인 숫자 증가
router.post("/updatecoincount", gameController.updateCoinCount);

//게임 성공 시 유저 해당 게임 상태 변경
router.post("/updateusergamestatus", gameController.updateUserGameStatus);

module.exports = router;