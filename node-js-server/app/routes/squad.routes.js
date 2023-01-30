const { authJwt } = require("../middlewares");
const controller = require("../controllers/squad.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/squad/user", [authJwt.verifyToken], controller.getSquad);

  app.post("/api/squad/set", [authJwt.verifyToken], controller.setSquad);
  app.post("/api/squad/release", [authJwt.verifyToken], controller.releaseMember);
};
