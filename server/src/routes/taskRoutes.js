const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

router.post("/", protect, createTask);

// Get tasks of a project
router.get("/project/:projectId", protect, getTasks);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;