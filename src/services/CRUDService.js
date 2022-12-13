import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("oke create a new user");
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = db.User.findAll({
        raw: true,
      });
      resolve(allUser);
    } catch (error) {
      reject(e);
    }
  });
};

const getUserInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userById = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (userById) {
        resolve(userById);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll({
          raw: true,
        });
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  hashUserPassword,
};
