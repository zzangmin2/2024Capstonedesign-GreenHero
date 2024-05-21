const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// 회원 전체 조회
router.get("/", userController.user);

// 회원가입
router.post("/signup", userController.signUp);

// 회원가입 시 중복 아이디 조회
router.post("/signup/confirmduplicatedid", userController.confirmDuplicatedId);

// 로그인
router.post("/login", userController.logIn);
module.exports = router;
