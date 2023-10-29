const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (value) => {
        return jwt.sign({_id: value, iat:Date.now()}, process.env.JWT_ACCESS_TOKEN_SECRET)
    }
}