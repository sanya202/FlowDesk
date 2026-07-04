const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/userController"); //importing controller

router.get("/", getAllUsers);

module.exports = router;