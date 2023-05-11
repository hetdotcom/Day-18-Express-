const fs = require("fs");
const crypto = require("crypto")

class Common {
  readJSON(sFilepath) {
    return JSON.parse(fs.readFileSync(sFilepath, "utf-8"));
  }
  writeJSON(sFilepath, oData) {
    return fs.writeFileSync(sFilepath, JSON.stringify(oData, null, 2), "utf-8");
  }
  getHash(password){
    return crypto.createHash('sha256').update(password).digest('hex');
  }

}

module.exports = new Common();
