const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../middlewares");
const { env, secret } = require("../config/vars");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Server Test API
router.get("/v1/", (req, res) => {
  res.status(200);
  res.json({ status: "success", message: "API Server Running." });
});

//Server API Docs
if (env == "development") {
}

router.use(`/${secret}/apidocs`, express.static(__dirname + "/../../apidocs"));

//Import APIs
router.use("/v1/auth", require("./auth"));
router.use("/v1/user", require("./user"));
router.use("/v1/admin", require("./admin"));


//product routes
router.use("/v1/products",require("./products"));
//cart routes
router.use(VerifyToken);
router.use("/v1/cart",require("./cart"));

router.use("/v1/payments", require("./payments"));


// Protect all routes after this middleware


//Global error handler
router.use((req, res) => {
  res.status(500);
  res.json({ status: "failed", error: "Internal Server Error." });
});

module.exports = router;
