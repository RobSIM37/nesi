const dataServ = require("./dataServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (credentials) => {
        const hashForGivenUserName = await dataServ.get("credentials", {userName: credentials.userName});
        
    },
    register: async (credentials) => {
        const existingUsers = await dataServ.get("credentials", {userName: credentials.userName});
        if (existingUsers[0]) return false;
        await bcrypt.hash(credentials.password, 10, async (err, hash) => {
            if (!err) {
                await dataServ.insert("credentials",
                {
                    "userName": credentials.userName,
                    "hash": hash
                })
            }
        });
        const insertResult = await dataServ.insert("users",{userName:credentials.userName, plans:[], friends:[]})
        const token = jwt.sign({_id: insertResult.insertedId, iat:Date.now()}, process.env.JWT_ACCESS_TOKEN_SECRET)
        return token;
    }
}