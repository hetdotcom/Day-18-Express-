const { common } = require("../../../../Common/common");

class Validator {
  validateUserCredForRegisterAndUpdate(req, res, next) {
    try {
      const { sUsername, sFullname, sEmail, sPassword, nMobile, sRole } =
        req.body;
      if (req.url === "/register" || req.url === "/update") {
        if (sUsername && sFullname && sEmail && sPassword && nMobile && sRole) {
          let bEmailValidation = common.validateEmail(sEmail);
          let bMobileValidation = common.validateMobile(nMobile);
          let bUnameValidation = common.v2ValidateUsername(sUsername);
          console.log(bUnameValidation);
          let bPasswordValidation = common.v2ValidatePassword(sPassword);
          console.log(bPasswordValidation);

          if (
            bUnameValidation &&
            bPasswordValidation &&
            bEmailValidation &&
            bMobileValidation
          ) {
            next();
          } else {
            return res.status(400).json({
              sError: "validaion failed",
            });
          }
        } else {
          return res.status(400).json({
            sError: "Please enter all the required fields",
          });
        }
      } else {
        return res.status(400).json({
          sError: "Please enter valid URI",
        });
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        sError: "Validation Error",
      });
    }
  }
  validateUserCredLogin(req, res, next) {
    try {
      const { sUsername, sPassword, sRole } = req.body;
      if (req.url === "/login") {
        if (sUsername && sPassword && sRole) {
          req.sUsername = sUsername;
          let bUnameValidation = common.validateUsername(sUsername);
          let bPasswordValidation = common.validatePassword(sPassword);

          if (bUnameValidation && bPasswordValidation) {
            next();
          } else {
            return res.status(400).json({
              nStatus: 400,
              sError: "validation failed",
            });
          }
        } else {
          return res.status(400).json({
            sError: "Please enter Username & Password",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        sError: "Validation Error",
      });
    }
  }
}

module.exports = new Validator();
