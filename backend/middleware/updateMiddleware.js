const friendsServ = require("../services/friendServices");
const messageServ = require("../services/messageServices");

module.exports = {
    updateFriendsAndMessages: async (req,res) => {
        res.body.friends = await friendsServ.getFriends(req._id);
        res.body.messages = await messageServ.getMessages(req._id);
        res.status(200).send(res.body);
    }
}