const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

const PORT = 8025;

server.listen(PORT, () => {console.log(`Server up and listening on port ${PORT}`);});