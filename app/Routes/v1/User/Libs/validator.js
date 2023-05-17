const { common } = require("../../../../Common/common");
const messaege = require("../../../../Messages");

class Validator {
  validateUserCredForRegisterAndUpdate(req, res, next) {
    try {
      const { sUsername, sFullname, sEmail, sPassword, nMobile, sRole } =
        req.body;
        if (sUsername && sFullname && sEmail && sPassword && nMobile && sRole) {
          let bEmailValidation = common.validateEmail(sEmail);
          let bMobileValidation = common.validateMobile(nMobile);
          let bUnameValidation = common.validateUsername(sUsername);
          let bPasswordValidation = common.validatePassword(sPassword);

          if (
            bUnameValidation &&
            bPasswordValidation &&
            bEmailValidation &&
            bMobileValidation
          ) {
            next();
          } else {
            return res
              .status(messaege.status.badrequest)
              .json(messaege.messages.validationError);
          }
        } else {
          return res
            .status(messaege.status.badrequest)
            .json(messaege.messages.mandatoryFields);
        }

    } catch (error) {
      // console.log(error);
      res.status(messaege.status.internalServerError).json(messaege.messages.validationError);
    }
  }
  validateUserCredLogin(req, res, next) {
    try {
      const { sUsername, sPassword, sRole } = req.body;
        if (sUsername && sPassword && sRole) {
          req.sUsername = sUsername;
          let bUnameValidation = common.validateUsername(sUsername);
          let bPasswordValidation = common.validatePassword(sPassword);

          if (bUnameValidation && bPasswordValidation) {
            next();
          } else {
            return res
              .status(messaege.status.badrequest)
              .json(messaege.messages.validationError);
          }
        } else {
          return res
            .status(messaege.status.badrequest)
            .json(messaege.messages.mandatoryFields);
        }
    } catch (error) {
      console.log(error);
      res
        .status(messaege.status.internalServerError)
        .json(messaege.messages.validationError);
    }
  }
}

module.exports = new Validator();
