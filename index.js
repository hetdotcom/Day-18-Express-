const express = require("express");
require("dotenv").config();
const config = require("./app/Config/config.js");
 
const app = express();

app.use(express.json());
app.use("/", require("./app"));

app.listen(config.PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Started listening on port ${config.PORT}`);
}); 