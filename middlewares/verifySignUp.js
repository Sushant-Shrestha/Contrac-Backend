const User = require("../models/userModel");

checkDuplicateHealthCardNum = (req, resp, next) => {

    User.findOne({
        cardNum: req.body.healthCardNum
    }).exec((err, user) => {
        if(err){
            resp.status(500).send({message: err});
            return;
        }

        if(user){
            resp.status(400).send({ Error: "There is already an account associated with this healthcard number." });
            return;
        }

        next();
    });
};

const verifySignUp = {checkDuplicateHealthCardNum};

module.exports = verifySignUp;