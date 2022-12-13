import doctorApiService from "../services/doctorApiService";

const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorApiService.getTopDoctorService(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let response = await doctorApiService.getAllDoctorsService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const postInfoDoctor = async (req, res) => {
  try {
    let response = await doctorApiService.saveDetailInfoDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    const response = await doctorApiService.getDetailDoctorService(
      req.query.id
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

const bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorApiService.bulkCreateScheduleService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const getScheduleDoctorByDate = async (req, res) => {
  try {
    let response = await doctorApiService.getScheduleDoctorByDateService(
      req.query.doctorId,
      req.query.date
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

const getExtraInfoDoctorById = async (req, res) => {
  try {
    let response = await doctorApiService.getExtraInfoDoctorByIdService(
      req.query.doctorId
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

const getProfileDoctorById = async (req, res) => {
  try {
    let response = await doctorApiService.getProfileDoctorByIdService(
      req.query.doctorId
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

const getListPatient = async (req, res) => {
  try {
    let response = await doctorApiService.getListPatientService(
      req.query.doctorId,
      req.query.date
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
const sendRemedy = async (req, res) => {
  try {
    let response = await doctorApiService.sendRemedyService(req.body);
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
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListPatient,
  sendRemedy,
};
