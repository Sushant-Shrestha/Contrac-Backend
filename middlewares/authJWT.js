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

isTracer = (req, resp, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            resp.status(500).send({ Error: err});
            return;
        }

        if(user.role === "tracer"){
            next();
            return;
        }

        resp.status(403).send({ Error: "This page can only be viewed by Contrac Tracer team."});
        return;
    })
}

const authJWT = {verifyToken, isTracer};

module.exports = authJWT;
