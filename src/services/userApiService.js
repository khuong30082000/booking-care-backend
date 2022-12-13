import db from "../models/index";
import { hashUserPassword } from "./CRUDService";
import { checkEmailExist } from "./authApiService";

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (!userId) {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          //   raw: true,
        });
      } else {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }

      resolve({ errCode: 0, message: "ok", users });
    } catch (error) {
      console.log(error);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //CHECK EMAIL CÓ TỒN TẠI CHƯA
      let check = await checkEmailExist(data.email);
      if (check) {
        resolve({ errCode: 1, message: "Email đã được sử dụng" });
        return;
      }

      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.position,
        image: data.avatar,
      });

      resolve({ errCode: 0, message: "ok" });
    } catch (error) {
      console.log(error);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.position;
        user.gender = data.gender;
        user.phonenumber = data.phoneNumber;
        if (data.avatar) {
          user.image = data.avatar;
        }

        await user.save();
        resolve({
          errCode: 0,
          message: "update thành công",
        });
      } else {
        resolve({
          errCode: 1,
          message: "khong tìm thấy user",
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: id },
      });

      if (!foundUser) {
        resolve({ errCode: 1, message: "không tim thấy user" });
      }

      await db.User.destroy({
        where: { id: id },
      });

      resolve({ errCode: 0, message: "Xóa user thành công" });
    } catch (error) {
      console.log(error);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
};
