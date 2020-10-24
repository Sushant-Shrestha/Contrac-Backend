const jwt = require("jsonwebtoken");
const { model } = require("../models/userModel");
const User = require("../models/userModel");

verifyToken = (req, resp, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return resp.status(403).send({Error: "No token provided."});
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return resp.status(401).send({ Error: "Unauthorized access."});
        }

        req.userId = decoded.id;
        next();
    });
};

const authJWT = {verifyToken};

module.exports = authJWT;
