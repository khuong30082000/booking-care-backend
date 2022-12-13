import patientApiService from "../services/patientApiService";

const postBookAppointment = async (req, res) => {
  try {
    let response = await patientApiService.postBookAppointmentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

const verifyBookAppointment = async (req, res) => {
  try {
    let response = await patientApiService.verifyBookAppointmentService(
      req.body
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
  postBookAppointment,
  verifyBookAppointment,
};
