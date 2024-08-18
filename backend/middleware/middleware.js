const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const { User } = require("../db");

async function authMiddleware(req, res, next) {
    const bearerToken = req.headers.authorization;
    if(!bearerToken || !bearerToken.startsWith("Bearer ")) {

        return res.status(403).json({
            message: "Access denied not token provided"
        });
        
    }

    const token = bearerToken.split(" ")[1];
    
    try {

        const decoded = jwt.verify(token, jwtSecret);
    
        if(decoded) {

            req.userId = decoded.id;
            next();

        }
        else {

            res.status(403).json({
                message: "Invalid token"
            });

        }

    }
    catch(error) {

        return res.status(403).json({
            message: "Error while authenticating the user"
        });
        
    }

}

module.exports = authMiddleware;