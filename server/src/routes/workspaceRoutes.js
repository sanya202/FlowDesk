const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createWorkspace,
    getMyWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
} = require("../controllers/workspaceController");

router.post("/", protect, createWorkspace);
router.get("/", protect, getMyWorkspaces);
router.get("/:id", protect, getWorkspaceById);
router.put("/:id", protect, updateWorkspace);
router.delete("/:id", protect, deleteWorkspace);

module.exports = router;