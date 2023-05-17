const router = require("express").Router();
const bodyParser = require("body-parser");

const userController = require("./Libs/controller");
const userMiddleware = require("./Libs/middleware");
const userValidator = require("./Libs/validator");

router.use(bodyParser.json());

router.post(
  "/register",
  userValidator.validateUserCredForRegisterAndUpdate,
  userMiddleware.isNewUser,
  userController.registerUser
);

router.post(
  "/login",
  userValidator.validateUserCredLogin,
  userMiddleware.authenticateUser,
  userController.loginUser
);
// /update
// /update/:id

router.put(
  "/update",
  userValidator.validateUserCredForRegisterAndUpdate,
  userMiddleware.verifyToken,
  userMiddleware.isNewUser,
  userController.updateUser

  // (req, res) => {
  //   res.send({ message: "update success" });
  // }
);

module.exports = router;
