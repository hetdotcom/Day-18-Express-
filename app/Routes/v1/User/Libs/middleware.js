const { common, oJsonfile } = require("../../../../Common/common");
let messaege = require("../../../../Messages");
const jwt = require("jsonwebtoken");

// const url = require("url")

class Middleware {
  isNewUser(req, res, next) {
    try {
      const { sUsername, sEmail, nMobile } = req.body;

      let nUnameIndex = common.findUsername(sUsername);
      let nEmailIndex = common.findEmail(sEmail);
      let nMobileIndex = common.findMobile(nMobile);
      // console.log(nUnameIndex, nEmailIndex, nMobileIndex);

      if (nUnameIndex != -1 || nEmailIndex != -1 || nMobileIndex != -1) {
        return res
          .status(messaege.status.accepted)
          .json(messaege.messages.alreadyRegisteredUser);
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res
        .status(messaege.status.internalServerError)
        .json(messaege.messages.middlewareError);
    }
  }

  authenticateUser(req, res, next) {
    try {
      const { sUsername, sPassword, sRole } = req.body;
      const nUserIndex = common.findUsername(sUsername);
      if (nUserIndex != -1) {
        if (
          oJsonfile.aUserdata[nUserIndex].sPassword ==
            common.getHash(sPassword) &&
          oJsonfile.aUserdata[nUserIndex].sRole == sRole
        ) {
          // console.log(nUserIndex);
          next();
        } else {
          return res
            .status(messaege.status.unauthorized)
            .json(messaege.messages.invalidCredentials);
        }
      } else {
        return res
          .status(messaege.status.unauthorized)
          .json(messaege.messages.invalidCredentials);
      }
      // console.log('////////////////////////////////');
    } catch (error) {
      console.log(error);
    }
  }

  verifyToken(req, res, next) {
    try {
      let jwtToken = req.headers["authorization"];
      if (typeof jwtToken != "undefined") {
        req.token = jwtToken;

        jwt.verify(jwtToken, process.env.SECRET_KEY, (error, data) => {
          if (error) {
            return res.status(messaege.status.unauthorized).json({
              sError: "Invalid Token",
            });
          } else {
            const { sUsername } = data;
            // console.log(10, sUsername);
            const nUserIndex = common.findUsername(sUsername);
            console.log(nUserIndex);
            req.nUserIndex = nUserIndex;
            next();
          }
        });
      } else {
        return res
          .status(messaege.status.unauthorized)
          .json(messaege.messages.invalidToken);
      }
    } catch (error) {
      return res
        .status(messaege.status.unauthorized)
        .json(messaege.messages.invalidToken);
    }
  }
}

module.exports = new Middleware();
