const dataServ = require("./dataServices");
const { ObjectId } = require("mongodb");

module.exports = {
    getMessages: async (userId) => {
        return await dataServ.get("messages", {"to":userId.toString(), "status": "unread"});
    },
    sendMessage: async (message) => {
        return await dataServ.insert("messages", message);
    },
    updateMessageStatus: async (messageId, status) => {
        return await dataServ.update("messages", {"_id": new ObjectId(messageId)}, {$set: {"status": status}});
    },
    getPreviousFriendRequest: async (to, from) => {
        return await dataServ.get("messages", {"to": to, "from": from, "type": "friend_request"});
    }
}