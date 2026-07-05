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

// Get My Workspaces
const getMyWorkspaces = async (req, res) => {
    try {

        const workspaces = await Workspace.find({
            members: req.user._id,
        })
            .populate("owner", "fullName email")
            .populate("members", "fullName email");

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

// Get Workspace By ID
const getWorkspaceById = async (req, res) => {
    try {

        const workspace = await Workspace.findOne({
            _id: req.params.id,
            members: req.user._id,
        })
            .populate("owner", "fullName email")
            .populate("members", "fullName email");

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

// Update Workspace
const updateWorkspace = async (req, res) => {
    try {

        const { name, description } = req.body;

        const workspace = await Workspace.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id,
            },
            {
                name,
                description,
            },
            {
                new: true,
            }
        );

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found or unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workspace updated successfully",
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

// Delete Workspace
const deleteWorkspace = async (req, res) => {
    try {

        const workspace = await Workspace.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found or unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workspace deleted successfully",
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
    updateWorkspace,
    deleteWorkspace,
};