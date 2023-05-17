const fs = require("fs");
const crypto = require("crypto");

let oJsonfile = JSON.parse(fs.readFileSync(
  "C:/Users/91720/Desktop/B-Square/Day-18(Express)/app/Model/db.json",
  "utf-8"
));

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

  findUsername(sUsername) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.sUsername === sUsername
    );
  }

  findMobile(nMobile) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.nMobile === nMobile
    );
  }

  findEmail(sEmail) {
    return oJsonfile.aUserdata.findIndex((object) => object.sEmail === sEmail);
  }

  findPassword(sPassword) {
    return oJsonfile.aUserdata.findIndex(
      (object) => object.sPassword === this.getHash(sPassword)
    );
  }

  validateUsername(sUsername) {
    let rUnameRegex = /^[A-Za-z]\w{3,16}$/;
    return rUnameRegex.test(sUsername);
  }

  validatePassword(sPassword) {
    let rPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{6,16})/;
    return rPasswordRegex.test(sPassword);
  }

  validateEmail(sEmail) {
    let rEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rEmailRegex.test(sEmail);
  }

  validateMobile(nMobile) {
    let rMobileRegex = /^\d{10}$/;
    return rMobileRegex.test(nMobile);
  }

  v2ValidatePassword(sPassword) {
    //at least one capital-small letter, total length 16
    let rPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,16})/;
    return rPasswordRegex.test(sPassword);
  }

  v2ValidateUsername(sUsername){
    let rUnameRegex =
      /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{3,16})/;
    return rUnameRegex.test(sUsername);
  }
}

let common = new Common();
module.exports = { oJsonfile, common };
