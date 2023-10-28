const jwt = require("jsonwebtoken");

module.export = {
    generate: (value) => {
        return jwt.sign({_id: value, iat:Date.now()}, process.env.JWT_ACCESS_TOKEN_SECRET)
    }
}