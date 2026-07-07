//Now we’re going to create a utility function for generating JWTs.
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, //info stored in the token
        process.env.JWT_SECRET, //no one can create a token without this secret key
        {
            expiresIn: "7d",
        }
    );
};

module.exports = generateToken;