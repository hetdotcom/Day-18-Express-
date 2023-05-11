const common = require("../../../../Common/common");

class Controller {
  registerUser(req, res) {
    try {
      let oJsonfile = common.readJSON(
        "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json"
      );

      let {sPassword} = req.body;
      let sPasswordHash = common.getHash(sPassword);  
      req.body.sPassword = sPasswordHash;

      oJsonfile.aUserdata.push(req.body);
      common.writeJSON(
        "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json",
        oJsonfile
        );
        res.status(200).json({
          nStatus: 200,
          sMessage: "registration done"
        })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        nStatus: 500,
        sError: "controller error",
      });
    }
  }
}

module.exports = new Controller();
