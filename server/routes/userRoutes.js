const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { tokenAuthMiddleware } = require("../middleware/tokenAuthMiddleware");

// 회원 전체 조회
router.get("/", userController.user);

// 회원가입
router.post("/signup", userController.signUp);

// 회원가입 시 중복 아이디 조회
router.post("/signup/confirmduplicatedid", userController.confirmDuplicatedId);

// 로그인
router.post("/login", userController.logIn);

//로그아웃
router.post("/logout", userController.logOut);

// [메인 화면] 현재 접속 사용자의 이름 및 코인 조회
router.get("/getUserInfo", tokenAuthMiddleware, userController.getUserInfo);

module.exports = router;
