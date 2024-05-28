const express = require("express");
const path = require("path");
const router = express.Router();

// router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "main", "index.html")
  );
});

router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "logIn", "index.html")
  );
});

router.get("/signup", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "signUp", "index.html")
  );
});

router.get("/light", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "light.html"));
});

router.get("/water", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "water", "index.html")
  );
});

router.get("/tree", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "tree", "index.html")
  );
});

router.get("/separate", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "separate", "index.html")
  );
});

module.exports = router;
