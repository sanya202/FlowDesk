const express = require("express");
const cors = require("cors");

const workspaceRoutes = require("./routes/workspaceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to FlowDesk API 🚀");
});

module.exports = app;

//* Registers a group of routes under a common URL prefix.
//* Keeps routing modular and organized.