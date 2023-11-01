const friendsServ = require("../services/friendServices");

module.exports = {
    getFriends: async (req, res) => {
        const result = await friendsServ.getFriends(req._id);
        result ? res.status(200).send(result) : res.status(500).send("error with friends get request");
    },
    getFriend: async (req, res) => {
        const result = await friendsServ.getFriend(req.params.name);
        result ? res.status(200).send(result) : res.status(500).send("error with friend get request");
    }
}