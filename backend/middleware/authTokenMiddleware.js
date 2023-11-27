const jwt = require("jsonwebtoken");
const tokenTimeOut = 1800000 //30 minutes;

module.exports = {
    validateToken: (req,res,next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, tokenPayload) => {
            if (err) return res.sendStatus(403);
            const timeSinceIssue = Date.now() - tokenPayload.iat;
            if (timeSinceIssue > tokenTimeOut) return res.sendStatus(403);
            req._id = tokenPayload._id;
            res["body"] = {};
            next();
        });
    }
}