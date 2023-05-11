// const fs = require("fs");

class Validator {
  validateUserCred(req, res, next) {
    try {
      const { sUsername, sFullname, sEmail, sPassword, nMobile } = req.body;
      if (sUsername && sFullname && sEmail && sPassword && nMobile) {
        
        let rUnameRegex = /^[A-Za-z]\w{3,16}$/;
        let bUnameValidation = rUnameRegex.test(sUsername);

        let rPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{6,16})/;
        let bPasswordValidation = rPasswordRegex.test(sPassword);

        if(bUnameValidation && bPasswordValidation){
            next();
            // return res.end("validation done");
        } else {
            return res.end("validation failed")
        }

      } else {
        return res.status(400).json({
          nStatus: 400,
          sError: "Please enter all the required fields",
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
