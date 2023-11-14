const messageServ = require("../services/messageServices");

module.exports = {
    sendMessage: async (req, res, next) => {
        const result = await messageServ.sendMessage(req.body);
        if (!result) res.status(500).send("error with send message request");
        res.body.payload = result;
        next();
    },
    updateMessage: async (req, res, next) => {
        const result = await messageServ.updateMessageStatus(req.params.id, req.body.status);
        if (!result) res.status(500).send("error with update message request");
        res.body.payload = result;
        next();
    }
}