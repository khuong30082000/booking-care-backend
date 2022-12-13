import allcodeApiService from "../services/allcodeApiService";

const getAllCode = async (req, res) => {
  try {
    let data = await allcodeApiService.getAllCodeService(req.query.type);
    return res.status(200).json({
      errCode: data.errCode,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "error from controller",
    });
  }
};

module.exports = {
  getAllCode,
};
