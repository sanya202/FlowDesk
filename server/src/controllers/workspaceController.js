const Workspace = require("../models/workspace");

// Create Workspace
const createWorkspace = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Workspace name is required",
            });
        }

        const workspace = await Workspace.create({
            name,
            description,
            owner: req.user._id,
            members: [req.user._id],
        });

        return res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            workspace,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get All Workspaces
const getMyWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({
            members: req.user._id,
        });

        return res.status(200).json({
            success: true,
            workspaces,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Single Workspace
const getWorkspaceById = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }

        return res.status(200).json({
            success: true,
            workspace,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createWorkspace,
    getMyWorkspaces,
    getWorkspaceById,
};