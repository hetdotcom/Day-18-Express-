const router = require("express").Router();

const user = require("./User/index");

router.use("/user", user);

module.exports = router;
