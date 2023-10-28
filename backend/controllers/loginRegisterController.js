const loginRegisterServ = require("../services/loginRegisterServices");

module.exports = {
    login: async (req, res) => {

    },
    register: async (req, res) => {
        const result = await loginRegisterServ.register(req.body);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send("registration error");
        }
    },
    auth: async (req, res) => {

    }
}