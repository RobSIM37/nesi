const friendsServ = require("../services/friendServices");

module.exports = {
    getFriends: async (req, res, next) => {
        const result = await friendsServ.getFriends(req._id);
        if (!result) res.status(500).send("error with friends get request");
        res.body.payload = result;
        next();
    },
    getFriend: async (req, res, next) => {
        const result = await friendsServ.getFriend(req.params.name);
        if (!result) res.status(500).send("error with friends get request");
        res.body.payload = result;
        next();
    },
    addFriend: async (req, res, next) => {
        const result = await friendsServ.addFriend(req.body);
        if (!result) res.status(500).send("error with adding friend");
        res.body.payload = result;
        next();
    },
    deleteFriend: async (req, res, next) => {
        const result = await friendsServ.deleteFriend(req.params.userId, req.params.id);
        if (!result) res.status(500).send("error deleting friend");
        res.body.payload = result;
        next();
    }
}