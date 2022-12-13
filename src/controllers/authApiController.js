import authApiService from "../services/authApiService";

const handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(200).json({
        errCode: 1,
        message: "missing inputs parameter!",
      });
    }

    let userData = await authApiService.handleUserLogin(email, password);

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.message,
      user: userData.user ? userData.user : {},
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
  handleLogin,
};
