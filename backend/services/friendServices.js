const dataServ = require("./dataServices");
const messageServ = require("./messageServices");
const { ObjectId } = require("mongodb");

module.exports = {
    getFriends: async (userId) => {
        const relationshipArr = await dataServ.get("friends",{"friends.id": userId});
        if (relationshipArr.length === 0) return [];
        return relationshipArr.map(relationship=>{
            return {id:relationship._id,
                    friend:relationship.friends.filter(friend=>friend.id != userId)[0]}});
    },
    getFriend: async (userName) => {
        const matchingUserObjects = await dataServ.get("users", {"userName": userName});
        const user = matchingUserObjects[0];
        if (!user) return null;
        return {_id: user._id, userName: user.userName}
    },
    addFriend: async (friendsData) => {
        const result = await dataServ.insert("friends", {friends: friendsData.friends});
        if (!result) return null;
        await messageServ.updateMessageStatus(friendsData.messageId, "read");
        return result;
    },
    deleteFriend: async (friendsId) => {
        const result = await dataServ.deleteFriend("friends", {"_id": new ObjectId(friendsId)});
        if (!result) return null;
        return result;
    }
}