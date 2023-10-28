const jwt = require("jsonwebtoken");
const jwtServ = require("../services/jwtServices");
const tokenTimeOut = 1800000 //30 minutes;

module.exports = {
    validateToken: (req,res,next) => {
        const authHeader = req.headers["authentication"];
        const token = authHeader.split(" ")[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, tokenPayload) => {
            if (err) res.sendStatus(403);
            const timeSinceIssue = Data.now() - tokenPayload.iat;
            if (timeSinceIssue > tokenTimeOut) res.sendStatus(403);
            req.userId = tokenPayload._id;
            next();
        });
    },
    generateResponseToken: (req,res) => {
        res.token = jwt.generate(res._id);
        res.status(200).send();
    }
}