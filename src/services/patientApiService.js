import db from "../models/index";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

const buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};

const postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullname
      ) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullname,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullname,
          },
        });

        // create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "save patient doctor success",
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

const verifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          message: "missing required prameters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "Update appointmnet success",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Appointment has been activated or does not exist",
          });
        }
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
  postBookAppointmentService,
  verifyBookAppointmentService,
};
