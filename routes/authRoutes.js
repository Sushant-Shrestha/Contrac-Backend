const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
    app.use(function(req, resp, next) {
        resp.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [verifySignUp.checkDuplicateHealthCardNum],
        controller.signUp
    );

    app.post("/api/auth/signin", controller.signIn);
}