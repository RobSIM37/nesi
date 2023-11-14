import axios from "axios";
import { 
    BACKGROUND_GET,
    BACKGROUND_POST,
    BACKGROUND_PUT,
    BACKGROUND_DELETE,
    DELETE,
    GET,
    POST,
    PUT,
    currentUrl,
    typeBackground
} from "../consts/url";
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
        this.#setState(this)
    }
    #handleRequestResult(result){
        this.#friends = result.data.friends;
        this.#messages = result.data.messages;
        this.#setState(this.clone);

        return result.data.payload;
    }
    async #sendRequest(type, url, payload){
        let result = null;
        if (typeBackground(true,type)){
            this.#setState(this.clone);
        }
        try {
            switch (type) {
                case GET:
                    result = await axios.get(url);
                    break;
                case POST:
                    result = await axios.post(url, payload);
                    break;
                case PUT:
                    result = await axios.put(url, payload);
                    break;
                case DELETE:
                    result = await axios.delete(url);
                    break;
                case BACKGROUND_GET:
                    axios.get(url).then(res => this.#handleRequestResult(res));
                    break;
                case BACKGROUND_POST:
                    axios.post(url, payload).then(res => this.#handleRequestResult(res));;
                    break;
                case BACKGROUND_PUT:
                    axios.put(url, payload).then(res => this.#handleRequestResult(res));;
                    break;
                case BACKGROUND_DELETE:
                    axios.delete(url).then(res => this.#handleRequestResult(res));;
                    break;
                default:
                    return result;
            }
        } catch(err) {
            console.log(err);
        }
        if (typeBackground(false, type)) {
            return this.#handleRequestResult(result);
        }
    }
    async #updateMessageStatus(messageId, status){
        this.#messages = this.#messages.filter(message => message._id !== messageId);
        this.#sendRequest(BACKGROUND_PUT,`${currentUrl()}/messages/${messageId}`,{
            status
        });
    }
    async sendMessage(toId, message){
        this.#sendRequest(BACKGROUND_POST,`${currentUrl()}/messages`, {
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
        this.#updateMessageStatus(messageId, READ);
    }
    async searchUsersForName(name){
        return await this.#sendRequest(GET,`${currentUrl()}/friends/${name}`);
    }
    async sendFriendRequest(id){
        return await this.#sendRequest(POST,`${currentUrl()}/messages`, {
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
        return await this.#sendRequest(POST,`${currentUrl()}/friends`, {
            messageId:message._id,
            friends:[
                {id: message.to, userName: this.#name}, {id: message.from, userName: message.fromName}
            ]});
    }
    async declineFriendRequest(messageId){
        this.#updateMessageStatus(messageId, DECLINED);
    }
    async removeFriend(relationshipId){
        this.#friends = this.#friends.filter(relationship => relationship.id !== relationshipId);
        this.#sendRequest(BACKGROUND_DELETE,`${currentUrl()}/friends/${this.#id}/${relationshipId}`);
    }
    async submitForm(form){
        console.log("Form:", form);
    }
}

export default User;