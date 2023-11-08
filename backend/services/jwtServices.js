const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (_id) => {
        return jwt.sign({_id, iat:Date.now()}, process.env.JWT_ACCESS_TOKEN_SECRET)
    }
}