const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const blacklistedTokens = new Set();

//토큰 검증 미들웨어 함수
const tokenAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!authHeader || !token) {
    return res.status(403).send("비정상 접근입니다.");
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
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

module.exports = { tokenAuthMiddleware, blacklistedTokens };
