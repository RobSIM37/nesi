const messageServ = require("../services/messageServices");

module.exports = {
    friendRequestAlreadySent: async (req, res, next) => {
        if (req.body.type !== "friend_request") next();
        const result = await messageServ.getPreviousFriendRequest(req.body.to, req.body.from);
        result.length !==0 ? res.sendStatus(409) : next();
    }
}