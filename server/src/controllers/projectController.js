const Project = require("../models/project");
const Workspace = require("../models/workspace");

// Create Project
const createProject = async (req, res) => {
    try {
        const { title, description, workspace } = req.body;

        if (!title || !workspace) {
            return res.status(400).json({
                success: false,
                message: "Title and Workspace are required",
            });
        }

        // Check if user is a member of the workspace
        const workspaceExists = await Workspace.findOne({
            _id: workspace,
            members: req.user._id,
        });

        if (!workspaceExists) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this workspace",
            });
        }

        const project = await Project.create({
            title,
            description,
            workspace,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Projects By Workspace
const getProjects = async (req, res) => {
    try {

        const projects = await Project.find({
            workspace: req.params.workspaceId,
        })
            .populate("createdBy", "fullName email")
            .populate("workspace", "name");

        return res.status(200).json({
            success: true,
            projects,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Single Project
const getProjectById = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id)
            .populate("createdBy", "fullName email")
            .populate("workspace", "name");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            project,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update Project
const updateProject = async (req, res) => {
    try {

        const { title, description } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {

        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
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
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};