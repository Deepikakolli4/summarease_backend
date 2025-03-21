const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const userController = require("../controllers/authController");


const userLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // Max 20 requests per 10 minutes per IP
  message: "Too many requests. Please try again later.",
  headers: true,
});


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per 15 minutes per IP
  message: "Too many login attempts. Please try again later.",
  headers: true,
});

router.post("/", userLimiter, userController.createUser);
router.get("/", userLimiter, userController.getUser);
router.post("/login", loginLimiter, userController.loginUser);

module.exports = router;
