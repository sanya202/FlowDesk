const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createWorkspace,
    getMyWorkspaces,
    getWorkspaceById,
} = require("../controllers/workspaceController");

router.post("/", protect, createWorkspace);

router.get("/", protect, getMyWorkspaces);

router.get("/:id", protect, getWorkspaceById);

module.exports = router;