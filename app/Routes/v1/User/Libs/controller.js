let messaege = require("../../../../Messages");

const { common, oJsonfile } = require("../../../../Common/common");
const jwt = require("jsonwebtoken");
class Controller {
  registerUser(req, res) {
    try {
      let { sPassword } = req.body;

      let sPasswordHash = common.getHash(sPassword);
      req.body.sPassword = sPasswordHash;

      oJsonfile.aUserdata.push(req.body);
      common.writeJSON(
        "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json",
        oJsonfile
      );
      return res
        .status(messaege.status.statusSuccess)
        .json(messaege.messages.registeredSuccess);
    } catch (error) {
      console.log(error);
      return res.status(messaege.status.internalServerError).json({
        sError: "controller error",
      });
    }
  }

  loginUser(req, res) {
    let aRights = [];
    try {
      let { sRole, sUsername } = req.body;
      if (!sRole && !sUsername) {
        return res.status(messaege.status.badrequest).json({
          sMessage: "Forbidden",
        });
      } else {
        if (sRole === "admin") {
          aRights = ["read", "create", "update", "delete"];
        } else if (sRole === "user") {
          aRights = ["read", "create", "update"];
        } else {
          return res.status(messaege.status.badrequest).json(messaege.messages.wrongRole);
        }
        jwt.sign(
          { aRights, sUsername },
          process.env.SECRET_KEY,
          { expiresIn: "2h" },
          (error, token) => {
            if (error) {
              console.log(error);
              return res.status(messaege.status.internalServerError).json(messaege.messages.tokenError);
            }
            // next(null);
            return res.status(messaege.status.statusSuccess).json({
              sMessage: messaege.messages.loginSuccess.messaege,
              token,
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateUser(req, res) {
    try {
      const nUserIndex = req.nUserIndex;

      if (nUserIndex != -1) {
        oJsonfile.aUserdata[nUserIndex] = req.body;
        // console.log(oJsonfile.aUserdata[nUserIndex], 83);

        oJsonfile.aUserdata[nUserIndex].sPassword = common.getHash(
          req.body.sPassword
        );
        // console.log(oJsonfile.aUserdata[nUserIndex], 87);
        // console.log(common.getHash('req.body.sPassword'), 89);

        common.writeJSON(
          "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json",
          oJsonfile
        );
      } else {
        return res.status(messaege.status.statusNotFound).json(messaege.messages.userNotFound);
      }
      console.log(oJsonfile);
    } catch (error) {
      // console.log(error);
      return res.status(messaege.status.internalServerError).json(messaege.messages.controllerError);
    }
    let oUpdatedData = oJsonfile.aUserdata[nUserIndex];
    res.status(messaege.status.statusSuccess).json({
      sMessage: messaege.messages.updatedProfile.messaege,
      oUpdatedData,
    });
  }
}

module.exports = new Controller();
