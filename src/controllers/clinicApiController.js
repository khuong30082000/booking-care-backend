import clinicApiService from "../services/clinicApiService";

const createClinic = async (req, res) => {
  try {
    let response = await clinicApiService.createClinicService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getAllClinic = async (req, res) => {
  try {
    let response = await clinicApiService.getAllClinicService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getDetailClinicById = async (req, res) => {
  try {
    let response = await clinicApiService.getDetailClinicByIdService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
