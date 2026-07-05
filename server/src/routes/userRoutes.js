const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getAllUsers); //protect is places before get all users 
//Because middleware must run before the controller. It verifies the user first. 
// If the user is authenticated, it calls next(), which passes control to getAllUsers.
//  If not, it stops the request with a 401 Unauthorized response.

module.exports = router;