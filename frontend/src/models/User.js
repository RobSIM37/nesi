import axios from "axios";
import { currentUrl } from "../consts/url";
import { friendRequestMessage } from "../consts/messages/friendRequest";
import { FRIEND_REQUEST, USER_GENERATED } from "../consts/messages/messageTypes";
import { DECLINED, READ, UNREAD } from "../consts/messages/messageStatus";

class User {
    #name
    #id
    #setState
    #friends
    #messages
    constructor(userData){
        this.#name = userData.userName;
        this.#id = userData._id;
        this.#friends = userData.friends;
        this.#messages = userData.messages;
    }
    get name() {
        return this.#name;
    }
    get id() {
        return this.#id;
    }
    get friends() {
        return this.#friends;
    }
    get messages() {
        return this.#messages;
    }
    get clone() {
        const clone = new User({
            userName:this.#name,
            _id:this.#id,
            friends:this.#friends,
            messages:this.#messages
        })
        clone.assignSetStateFunction(this.#setState);
        return clone;
    }
    assignSetStateFunction(func){
        this.#setState = func;
    }
    updateState(){
        this.#setState(this.clone);
    }
    async #sendRequest(type, url, payload){
        let result = null;
        try {
            switch (type) {
                case "get":
                    result = await axios.get(url);
                    break;
                case "post":
                    result = await axios.post(url, payload);
                    break;
                case "put":
                    result = await axios.put(url, payload);
                    break;
                case "delete":
                    result = await axios.delete(url);
                    break;
                default:
                    return result;
            }
        } catch(err) {
            console.log(err);
            return result
        }
        this.#friends = result.data.friends;
        this.#messages = result.data.messages;
        this.updateState();

        return result.data.payload;
    }
    async #updateMessageStatus(messageId, status){
        return await this.#sendRequest("put",`${currentUrl()}/messages/${messageId}`,{
            status
        });
    }
    async sendMessage(toId, message){
        return await this.#sendRequest("post",`${currentUrl()}/messages`, {
            to: toId,
            from: this.#id,
            fromName: this.#name,
            senderName: this.#name,
            body: message,
            type: USER_GENERATED,
            status: UNREAD
        });
    }
    async markMessageAsRead(messageId){
        return await this.#updateMessageStatus(messageId, READ);
    }
    async searchUsersForName(name){
        return await this.#sendRequest("get",`${currentUrl()}/friends/${name}`);
    }
    async sendFriendRequest(id){
        return await this.#sendRequest("post",`${currentUrl()}/messages`, {
            to: id,
            from: this.#id,
            fromName: this.#name,
            senderName: "Friends System",
            body: friendRequestMessage(this.#name),
            type: FRIEND_REQUEST,
            status: UNREAD
        });
    }
    async acceptFriendRequest(message){
        return await this.#sendRequest("post",`${currentUrl()}/friends`, {
            messageId:message._id,
            friends:[
                {id: message.to, userName: this.#name}, {id: message.from, userName: message.fromName}
            ]});
    }
    async declineFriendRequest(messageId){
        return await this.#updateMessageStatus(messageId, DECLINED);
    }
    async removeFriend(relationshipId){
        return await this.#sendRequest("delete",`${currentUrl()}/friends/${this.#id}/${relationshipId}`);
    }
}

export default User;