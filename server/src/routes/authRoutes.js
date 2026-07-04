const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");

router.post("/register", registerUser); //creating new user is post

module.exports = router;