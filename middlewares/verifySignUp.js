const User = require("../models/userModel");

checkDuplicateHealthCardNum = (req, resp, next) => {
    User.findOne({
        healthCardNum: req.body.healthCardNum
    }).exec((err, user) => {
        if(err){
            resp.status(500).send({message: err});
            return;
        }

        if(user){
            resp.status(400).send({ Error: "There is already an account associated with this healthcard number." });
            return;
        }
        console.log("No duplicate found -- del after")
        next();
    });
};

checkRole = (req, resp, next) => {
    var roles = ["patient","tracer"];
    if(req.body.role){
        if(!roles.includes(req.body.role)){
            resp.status(400).send({ Error: `Role ${req.body.role} doesnt exist!`});
            return;
        };
    }

    next();
}

const verifySignUp = {checkDuplicateHealthCardNum, checkRole};

module.exports = verifySignUp;