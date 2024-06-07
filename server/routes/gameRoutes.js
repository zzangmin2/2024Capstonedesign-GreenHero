const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");
const { tokenAuthMiddleware } = require("../middleware/tokenAuthMiddleware");

//전체 회원의 게임 현황 조회
router.get("/gamestatus", gameController.gameStatus);

//해당 회원의 게임 현황 조회
router.get(
  "/getUserGameInfo",
  tokenAuthMiddleware,
  gameController.getUserGameInfo
);

//게임 성공 시 유저 해당 게임 상태 변경
/**
 * @method POST
 * @endPoint game/updateusergamestatus
 * @body { gameName : waterGame }
 *
 */
router.post(
  "/updateusergamestatus",
  tokenAuthMiddleware,
  gameController.updateUserGameStatus
);

module.exports = router;
