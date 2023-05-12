const common = require("../../../../Common/common");

class Validator {
  validateUserCred(req, res, next) {
    try {
      const { sUsername, sFullname, sEmail, sPassword, nMobile } = req.body;
      if (req.url === "/register") {
        if (sUsername && sFullname && sEmail && sPassword && nMobile) {
          let bEmailValidation = common.validEmail(sEmail);
          let bMobileValidation = common.validMobile(nMobile);
          let bUnameValidation = common.validUsername(sUsername);
          let bPasswordValidation = common.validPassword(sPassword);

          if (
            bUnameValidation &&
            bPasswordValidation &&
            bEmailValidation &&
            bMobileValidation
          ) {
            next();
          } else {
            return res.end("validation failed");
          }
        } else {
          return res.status(400).json({
            nStatus: 400,
            sError: "Please enter all the required fields",
          });
        }
      } else if (req.url === "/login") {
        if (sUsername && sPassword) {
          let bUnameValidation = common.validUsername(sUsername);
          let bPasswordValidation = common.validPassword(sPassword);
          if (bUnameValidation && bPasswordValidation) {
            next();
          } else {
            return res.end("validation failed");
          }
        } else {
          return res.status(400).json({
            nStatus: 400,
            sError: "Please enter Username & Password",
          });
        }
      } else {
        return res.status(400).json({
          nStatus: 400,
          sError: "Please enter valid URI",
        });
      }
    } catch (error) {
      res.status(500).json({
        nStatus: 500,
        sError: "Validation Error",
      });
    }
  }
}

module.exports = new Validator();
