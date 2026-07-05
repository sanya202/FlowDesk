const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

router.post("/", protect, createProject);

// Get all projects in a workspace
router.get("/workspace/:workspaceId", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

module.exports = router;