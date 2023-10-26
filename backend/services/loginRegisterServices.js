const dataServ = require("./dataServices");

module.exports = {
    login: async (credentials) => {

    },
    register: async (credentials) => {
        const existingUser = dataServ.get("credentials", {userName: credentials.userName})[0];
        if (existingUser) return false;
        
    },
    auth: async (credentials) => {
        const matchingAuthData = dataServ.get("authTokens", {authToken:credentials.authToken})[0];
        if (matchingAuthData) {

        } else {
            return null;
        }
    }
}