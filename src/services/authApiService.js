import db from "../models/index";
import bcrypt from "bcrypt";

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmailExist(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            console.log(user);
            delete user.password,
              resolve({
                errCode: 0,
                message: "ok",
                user: user,
              });
          } else {
            resolve({
              errCode: 3,
              message: "wrong password",
            });
          }
        } else {
          resolve({
            errCode: 2,
            message: "User's not found ",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "Email không đúng",
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

const checkEmailExist = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(e);
      reject({
        errCode: -2,
        message: "error from server",
      });
    }
  });
};

module.exports = {
  handleUserLogin,
  checkEmailExist,
};
