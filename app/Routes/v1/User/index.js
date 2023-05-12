const router = require("express").Router();
const bodyParser = require("body-parser");

const userController = require("./Libs/controller");
const userMiddleware = require("./Libs/middleware");
const userValidator = require("./Libs/validator");

router.use(bodyParser.json());

router.post(
  "/register",
  userValidator.validateUserCred,
  userMiddleware.isNewUser,
  userController.registerUser
);

router.post(
  "/login",
  userValidator.validateUserCred,
  // userMiddleware.isNewUser,
  // userController.registerUser
);

// router.put(
//   "/update/:username",
//   userMiddleware.authenticateUser,
//   userValidator.validateUserCred
// );

module.exports = router;
