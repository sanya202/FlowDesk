const Task = require("../models/task");
const Project = require("../models/project");

// Create Task
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            assignee,
            project,
        } = req.body;

        if (!title || !project) {
            return res.status(400).json({
                success: false,
                message: "Title and Project are required",
            });
        }

        const projectExists = await Project.findById(project);

        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            assignee,
            project,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Tasks By Project
const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            project: req.params.projectId,
        })
            .populate("assignee", "fullName email")
            .populate("createdBy", "fullName email")
            .populate("project", "name");

        return res.status(200).json({
            success: true,
            tasks,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get Single Task
const getTaskById = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)
            .populate("assignee", "fullName email")
            .populate("createdBy", "fullName email")
            .populate("project", "name");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            task,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate,
            assignee,
        } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                status,
                priority,
                dueDate,
                assignee,
            },
            {
                new: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
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
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};