const router = require("express").Router();

const routes_v1 = require("./Routes/v1");
const routes_v2 = require("./Routes/v2");

router.use("/v1", routes_v1);
router.use("/v2", routes_v2);

module.exports = router;
