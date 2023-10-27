const dataServ = require("./dataServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (credentials) => {

    },
    register: async (credentials) => {
        const existingUser = dataServ.get("credentials", {userName: credentials.userName})[0];
        if (existingUser) return false;
        const insertResults = bcrypt.hash(credentials.password, 10, async (err, hash) => {
            if (!err) {
                return await dataServ.insert("credentials",
                {
                    "userName": credentials.userName,
                    "hash": hash
                })
            }
        });
        if (!insertResults) return false;
        
        const token = jwt.sign({_id: insertResults._id, iat:Date.now()}, process.env.JWT_ACCESS_TOKEN_SECRET)
    },
    auth: async (credentials) => {
        const matchingAuthData = dataServ.get("authTokens", {authToken:credentials.authToken})[0];
        if (matchingAuthData) {

        } else {
            return null;
        }
    }
}