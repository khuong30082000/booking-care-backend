const db = require("../models");

const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = "";
      if (!typeInput) {
        allcode = await db.Allcode.findAll();
        resolve({
          errCode: 0,
          message: "ok",
          data: allcode,
        });
      } else {
        allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        resolve({
          errCode: 0,
          message: "ok",
          data: allcode,
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

module.exports = {
  getAllCodeService,
};
