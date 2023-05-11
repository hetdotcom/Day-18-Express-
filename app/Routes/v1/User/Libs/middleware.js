const common = require("../../../../Common/common");
// const url = require("url")

class Middleware {
  isNewUser(req, res, next) {
    try {
      const { sUsername, sEmail, nMobile } = req.body;
      let oJsonfile = common.readJSON(
        "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json"
      );
      // console.log(oJsonfile);

      let nUnameIndex = oJsonfile.aUserdata.findIndex(
        (object) => object.sUsername === sUsername
      );
      let nEmailIndex = oJsonfile.aUserdata.findIndex(
        (object) => object.sEmail === sEmail
      );
      let nMobileIndex = oJsonfile.aUserdata.findIndex(
        (object) => object.nMobile === nMobile
      );
      // console.log(nUnameIndex, nEmailIndex, nMobileIndex);

      if (nUnameIndex != -1 || nEmailIndex != -1 || nMobileIndex != -1) {
        return res.send({ sMessage: "user already registered!!" });
      } else {
        next();
      }
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        nStatus: 500,
        sError: "Middleware error",
      });
    }
  }
  
  authenticateUser(req, res, next) {
    try {
      // console.log(req.params.username);
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
      res.send(req.params.username);
    } catch (error) {}
  }
}

module.exports = new Middleware();
