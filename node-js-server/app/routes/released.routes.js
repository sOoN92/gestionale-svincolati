const { authJwt } = require("../middlewares");
const controller = require("../controllers/released.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/released/get", [authJwt.verifyToken], controller.getReleased);

  app.post("/api/released/set", [authJwt.verifyToken], controller.setReleased);
};
