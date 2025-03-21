const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const userController = require("../controllers/authController");


const transcriptLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10, 
  message: "Too many requests. Please try again later.",
  headers: true,
});


router.get("/transcript", transcriptLimiter, userController.getTranscript);

module.exports = router;
