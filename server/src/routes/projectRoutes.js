const express = require("express");
const router = express.Router();

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Project
router.post("/", authMiddleware, createProject);

// Get all projects in a workspace
router.get("/workspace/:workspaceId", authMiddleware, getProjects);

// Get one project
router.get("/:id", authMiddleware, getProjectById);

// Update project
router.put("/:id", authMiddleware, updateProject);

// Delete project
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;