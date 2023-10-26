class User {
    #id
    #setState
    constructor(userData){
        this.#id=userData.id
    }
    get Id() {
        return this.#id;
    }
    assignSetStateFunction(func){
        this.#setState = func;
    }
    updateState(){
        this.#setState(this);
    }
}


export default User;