const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const { User } = require("../db");

async function authMiddleware(req, res, next) {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        res.status(400).json({
            message: "Access denied not token provided"
        })
    }
    const token = bearerToken.split(" ")[1];
    
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById({_id: decoded.id}, "username");
    
    if(user) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(400).json({
            message: "Invalid token"
        })
    }

}

module.exports = authMiddleware;