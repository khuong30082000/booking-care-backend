import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log(data);
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (error) {}
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("acbasad");
};

const displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log(data);
  return res.render("displayCRUD.ejs", { data });
};

const editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editCRUD.ejs", { userData });
  } else {
    return res.send("User not found");
  }
};

const putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", { data: allUsers });
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  editCRUD,
  putCRUD,
};
