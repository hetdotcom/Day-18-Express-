const oDev = {
  dev: {
    PORT: process.env.PORT || 4000,
  },
  prod: {
    PORT: process.env.PORT || 8000,
  }
};
module.exports = oDev[process.env.NODE_ENV || "dev"];
