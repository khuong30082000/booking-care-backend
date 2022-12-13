import db from "../models/index";
const createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
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

const getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();

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

const getDetailClinicByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });

        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Info.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
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
  createClinicService,
  getAllClinicService,
  getDetailClinicByIdService,
};
