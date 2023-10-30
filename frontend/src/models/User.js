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
}


export default User;