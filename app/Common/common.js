const fs = require("fs");
const crypto = require("crypto");

class Common {
  readJSON(sFilepath) {
    return JSON.parse(fs.readFileSync(sFilepath, "utf-8"));
  }

  writeJSON(sFilepath, oData) {
    return fs.writeFileSync(sFilepath, JSON.stringify(oData, null, 2), "utf-8");
  }

  getHash(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  findUsername(oJsonfile, sUsername) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.sUsername === sUsername
    );
  }

  findMobile(oJsonfile, nMobile) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.nMobile === nMobile
    );
  }

  findEmail(oJsonfile, sEmail) {
    return oJsonfile.aUserdata.findIndex((object) => object.sEmail === sEmail);
  }

  findPassword(oJsonfile, sPassword) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.sPassword === this.getHash(sPassword)
    );
  }

  validUsername(sUsername) {
    let rUnameRegex = /^[A-Za-z]\w{3,16}$/;
    return rUnameRegex.test(sUsername);
  }

  validPassword(sPassword) {
    let rPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{6,16})/;
    return rPasswordRegex.test(sPassword);
  }

  validEmail(sEmail) {
    let rEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rEmailRegex.test(sEmail);
  }

  validMobile(nMobile) {
    let rMobileRegex = /^\d{10}$/;
    return rMobileRegex.test(nMobile);
  }


}

module.exports = new Common();

// const { sUsername, sEmail, nMobile } = req.body;
// let oJsonfile = common.readJSON(
//   "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json"
// );
// // console.log(oJsonfile);

// let nUnameIndex = oJsonfile.aUserdata.findIndex(
//   (object) => object.sUsername === sUsername
// );
// let nEmailIndex = oJsonfile.aUserdata.findIndex(
//   (object) => object.sEmail === sEmail
// );
// let nMobileIndex = oJsonfile.aUserdata.findIndex(
//   (object) => object.nMobile === nMobile
// );
// // console.log(nUnameIndex, nEmailIndex, nMobileIndex);
