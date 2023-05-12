const common = require("../../../../Common/common");
// const url = require("url")

class Middleware {
  isNewUser(req, res, next) {
    try {
      const { sUsername, sEmail, nMobile } = req.body;

      let oJsonfile = common.readJSON(
        "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json"
      );

      let nUnameIndex = common.findUsername(oJsonfile, sUsername);
      let nEmailIndex = common.findEmail(oJsonfile, sEmail);
      let nMobileIndex = common.findMobile(oJsonfile, nMobile);
      // console.log(nUnameIndex, nEmailIndex, nMobileIndex);

      if (nUnameIndex != -1 || nEmailIndex != -1 || nMobileIndex != -1) {
        return res.send({ sMessage: "user already registered!!" });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        nStatus: 500,
        sError: "Middleware error",
      });
    }
  }

  authenticateUser(req, res, next) {
    // console.log(req.params.username);
    try {
      if (!req.params.username) {
        return res.status(400).json({
          nStatus: 400,
          sError: "Username is required",
        });
      } else {
        return res.status(200).json({
          nStatus: 200,
          sMessage: req.params.username,
        });
        // next();
      }
    } catch (error) {}
  }

  verifyToken() {}
}

module.exports = new Middleware();
