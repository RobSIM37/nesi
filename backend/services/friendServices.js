const dataServ = require("./dataServices");
const { ObjectId } = require("mongodb");

module.exports = {
    getFriends: async (userId) => {
        const matchingUserObjects = await dataServ.get("users", {"_id": new ObjectId(userId)});
        const user = matchingUserObjects[0];
        if (!user) return null;
        const friendsIdArray = user.friends;
        if (!friendsIdArray) return null;
        if (friendsIdArray.length === 0) return {friends: []};
        const friendsArray = await dataServ.get("users", {"_id": {"$in": friendsArray.map(friend=>friend._id)}});
        if (!friendsArray) return null;
        return friendsArray;
    },
    getFriend: async (userName) => {
        const matchingUserObjects = await dataServ.get("users", {"userName": userName});
        const user = matchingUserObjects[0];
        if (!user) return null;
        return {_id: user._id, userName: user.userName}
    },
    addUpdateFriends: async (userId, friendsData) => {
        
    }
}