const dataServ = require("./dataServices");
const messageServ = require("./messageServices");
const { ObjectId } = require("mongodb");

const getRelationship = async (relationshipId) => {
    return await dataServ.get("friends", {"_id": new ObjectId(relationshipId)})
}

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
    deleteFriend: async (userId, friendsId) => {
        const relationshipArr = await getRelationship(friendsId);
        const relationship = relationshipArr[0];
        const deletingUser = relationship.friends.filter(friend=>friend.id === userId)[0];
        const otherUser = relationship.friends.filter(friend=>friend.id !== userId)[0];
        await messageServ.sendMessage({
            to: otherUser.id,
            from: deletingUser.id,
            fromName: deletingUser.userName,
            senderName: "Friends System",
            body: `${deletingUser.userName} has removed you as a friend. If this causes you any level of concern, you may want to reach out to them.`,
            type: "deleted_friend",
            status: "unread"
        });
        const result = await dataServ.delete("friends", {"_id": new ObjectId(friendsId)});
        if (!result) return null;
        return result;
    }
}