import specialtyApiService from "../services/specialtyApiService";

const createSpecialty = async (req, res) => {
  try {
    let response = await specialtyApiService.createSpecialtyService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getAllSpecialty = async (req, res) => {
  try {
    let response = await specialtyApiService.getAllSpecialtyService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getDetailSpecialtyById = async (req, res) => {
  try {
    let response = await specialtyApiService.getDetailSpecialtyByIdService(
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
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
