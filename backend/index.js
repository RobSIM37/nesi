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
const authTokenMid = require("./middleware/authTokenMiddleware");

server.post("/login", loginRegisterCtrl.login);
server.post("/register", loginRegisterCtrl.register);

server.use(authTokenMid.validateToken);

server.post("/refresh-token", loginRegisterCtrl.refreshAuthToken);

server.get("/messages", ()=>{}) // get all pending messages
server.post("/messages", ()=>{}) // send a message

server.get("/plans", ()=>{}) // get all user plans
server.post("/plans", ()=>{}) // add/update user plan

server.get("/form", ()=>{}) // get a form
server.post("/form", ()=>{}) // add/update a form
server.post("/form/data", ()=>{}) // post form data

server.get("/friends", friendCtrl.getFriends);
server.get("/friend/:name", friendCtrl.getFriend);
server.post("/friends", ()=>{}) // update user friends list

server.listen(process.env.PORT, () => {console.log(`Server up and listening on port ${process.env.PORT}`);});