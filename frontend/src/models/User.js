import axios from "axios";
import { currentUrl } from "../consts/url";

class User {
    #id
    #setState
    #friends
    constructor(userData){
        this.#id = userData._id;
        this.#friends = userData.friends;
    }
    get id() {
        return this.#id;
    }
    get friends() {
        return this.#friends;
    }
    assignSetStateFunction(func){
        this.#setState = func;
    }
    updateState(){
        this.#setState(this);
    }
    async searchUsersForName(name){
        const friendData = await axios.get(`${currentUrl()}/friend/${name}`).catch(err=>{return err});
        if (!friendData.status === 200) return null;
        return friendData.data;
    }
}

export default User;