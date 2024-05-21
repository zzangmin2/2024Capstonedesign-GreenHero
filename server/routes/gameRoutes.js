const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

//전체 회원의 게임 현황 조회
router.get("/gamestatus", gameController.gameStatus);

module.exports = router;
