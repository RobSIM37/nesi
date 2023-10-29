const dataServ = require("./dataServices");
const bcrypt = require("bcrypt");
const jwtServ = require("./jwtServices");
const { ObjectId } = require("mongodb");

const validateCredentials = async (credentials) => {
    const matchingUserNames = await dataServ.get("credentials", {userName: credentials.userName});
    if (!matchingUserNames[0]) return null;
    const hash = matchingUserNames[0].hash;
    if (!hash) return null;
    const valid = await bcrypt.compare(credentials.password, hash);
    if (!valid) return null;
    const users = await dataServ.get("users", {userName: credentials.userName});
    const user = users[0];
    if (!user) return null;
    user.token = jwtServ.generateToken(user._id);
    return user;
}

module.exports = {
    login: async (credentials) => {
        return await validateCredentials(credentials);
    },
    register: async (credentials) => {
        const existingUsers = await dataServ.get("credentials", {userName: credentials.userName});
        if (existingUsers[0]) return null;
        bcrypt.hash(credentials.password, 10, async (err, hash) => {
            if (!err) {
                await dataServ.insert("credentials",
                {
                    "userName": credentials.userName,
                    "hash": hash
                })
            }
        });
        const user = {userName:credentials.userName, plans:[], friends:[]}
        const insertResult = await dataServ.insert("users", user);
        user.token = jwtServ.generateToken(insertResult._id);
        return user;
    },
    refreshAuthToken: async (credentials) => {
        const matchingUserObjects = await dataServ.get("users", {"_id": new ObjectId(credentials._id)});
        if (!matchingUserObjects[0]) return null
        const userName = matchingUserObjects[0].userName;
        if (!userName) return null;
        const result = await validateCredentials({userName, password:credentials.password})
        if (!result) return null;
        if (!result.token) return null;
        return {token: result.token};
    }
}