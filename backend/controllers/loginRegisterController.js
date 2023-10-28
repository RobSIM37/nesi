const loginRegisterServ = require("../services/loginRegisterServices");

module.exports = {
    login: async (req, res) => {
        const result = await loginRegisterServ.login(req.body);
        if (result) res.status(200).send(result);
        res.status(500).send("login error");
    },
    register: async (req, res) => {
        const result = await loginRegisterServ.register(req.body);
        if (result) res.status(200).send(result);
        res.status(500).send("registration error");
    }
}