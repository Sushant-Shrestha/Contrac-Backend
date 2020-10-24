const User = require("../models/userModel");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signUp = (req, resp) => {
    console.log("@signup");
    const user = new User({ 
        fName: req.body.fName,
        lName: req.body.lName,
        healthCardNum: req.body.healthCardNum,
        password: bcrypt.hashSync(req.body.password, 16)
    });

    user.save((err, user) => {
        if(err){
            resp.status(500).send({ Error: err});
            return;
        }

        resp.send({Message: "User was registered successfully."});
    });
};

exports.signIn = (req, resp) => {
    User.findOne({
        healthCardNum: req.body.healthCardNum
    }).exec((err, user) => {
        if(err) {
            resp.status(500).send({ Error: err});
            return;
        }

        if(!user) {
            resp.status(404).send({ Error: "User not found."});
            return;
        }

        var passwordIsValid = bcrypt.compareSync( req.body.password, user.password);

        if(!passwordIsValid) {
            return resp.status(401).send({
                accessToken: null,
                Message: "Invalid password."
            });
        }

        var token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 43200 //12hrs
        });

        resp.status(200).send({
            id: user._id,
            fName: user.fName,
            lName: user.lName,
            accessToken: token
        });
    });
};