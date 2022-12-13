import userApiService from "../services/userApiService";

const handleGetAllUsers = async (req, res) => {
  try {
    let id = req.query.id;
    let data = await userApiService.getAllUsers(id);

    return res.status(200).json({
      errCode: data.errCode,
      message: data.message,
      user: data.users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: "error from controller",
      message: "-1",
      user: "",
    });
  }
};

const handleCreateNewUser = async (req, res) => {
  try {
    let data = await userApiService.createNewUser(req.body);
    return res.status(200).json({
      errCode: data.errCode,
      message: data.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: "error from controller",
      message: "-1",
      user: "",
    });
  }
};

const handleEditUser = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);

    return res.status(200).json({
      errCode: data.errCode,
      message: data.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: "error from controller",
      message: "-1",
      user: "",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);

    return res.status(200).json({
      errCode: data.errCode,
      message: data.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: "error from controller",
      message: "-1",
      user: "",
    });
  }
};

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
