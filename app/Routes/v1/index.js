const router = require("express").Router();

const user = require("./User");

router.use("/user", user);

module.exports = router;
