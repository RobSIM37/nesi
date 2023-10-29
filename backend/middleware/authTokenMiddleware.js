const jwt = require("jsonwebtoken");
const jwtServ = require("../services/jwtServices");
const tokenTimeOut = 1800000 //30 minutes;

module.exports = {
    validateToken: (req,res,next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, tokenPayload) => {
            if (err) res.sendStatus(403);
            const timeSinceIssue = Date.now() - tokenPayload.iat;
            if (timeSinceIssue > tokenTimeOut) res.sendStatus(403);
            req._id = tokenPayload._id;
            res._id = tokenPayload._id;
            next();
        });
    },
    generateResponseToken: (req,res) => {
        const responseToken = jwtServ.generateToken(res._id);
        if (res.body) {
            res.body["token"] = responseToken;
            res.status(200).send(res.body);
        } else {
            res.status(200).send(responseToken);
        }
    }
}