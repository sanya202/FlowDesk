const User = require("../models/user"); //controler needs to talk to database with the models

const getAllUsers = async (req, res) => { //controller gets all user with help of routes n models
    try {
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    getAllUsers,
};