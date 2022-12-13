import db from "../models/index";
const createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "ok",
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

const getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
        data,
      });
    } catch (e) {
      console.log(e);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

const getDetailSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });

        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
        } else data = {};

        resolve({
          errCode: 0,
          message: "ok",
          data,
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
  createSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyByIdService,
};
