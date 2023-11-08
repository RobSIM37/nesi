require('dotenv').config()

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

const loginRegisterCtrl = require("./controllers/loginRegisterController");
const friendCtrl = require("./controllers/friendController");
const messageCtrl = require("./controllers/messageController");
const authTokenMid = require("./middleware/authTokenMiddleware");
const updateMid = require("./middleware/updateMiddleware")

server.post("/login", loginRegisterCtrl.login);
server.post("/register", loginRegisterCtrl.register);

server.use(authTokenMid.validateToken);


server.post("/refresh-token", loginRegisterCtrl.refreshAuthToken);

server.post("/messages", messageCtrl.sendMessage);
server.put("/messages/:id", messageCtrl.updateMessage);

server.get("/plans", ()=>{}) // get all user plans
server.post("/plans", ()=>{}) // add/update user plan

server.get("/form", ()=>{}) // get a form
server.post("/form", ()=>{}) // add/update a form
server.post("/form/data", ()=>{}) // post form data

server.get("/friends", friendCtrl.getFriends);
server.get("/friends/:name", friendCtrl.getFriend);
server.post("/friends", friendCtrl.addFriend);
server.delete("/friends/:user-id/:friend-id", friendCtrl.deleteFriend);

server.use(updateMid.updateFriendsAndMessages);

server.listen(process.env.PORT, () => {console.log(`Server up and listening on port ${process.env.PORT}`);});