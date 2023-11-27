const loginRegisterServ = require("../services/loginRegisterServices");

module.exports = {
    login: async (req, res) => {
        const result = await loginRegisterServ.login(req.body);
        result ? res.status(200).send(result) : res.status(500).send("login error");
    },
    register: async (req, res) => {
        const result = await loginRegisterServ.register(req.body);
        result ? res.status(200).send(result) : res.status(500).send("registration error");
    },
    refreshAuthToken: async (req, res) => {
        const result = await loginRegisterServ.refreshAuthToken({...req.body, _id:req._id});
        if (!result) res.status(500).send("auth token refresh error");
        res.status(200).send(result);
    }
}