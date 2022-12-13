import express from "express";
import authApiController from "../controllers/authApiController";
import userApiController from "../controllers/userApiController";
import allcodeApiController from "../controllers/allcodeApiController";
import doctorApiController from "../controllers/doctorApiController";
import patientApiController from "../controllers/patientApiController";
import specialtyApiController from "../controllers/specialtyApiController";
import clinicApiController from "../controllers/clinicApiController";

const router = express.Router();

const innitApiRoutes = (app) => {
  //Auth
  router.post("/login", authApiController.handleLogin);

  //CRUD USER REST API
  router.get("/get-all-users", userApiController.handleGetAllUsers);
  router.post("/create-new-user", userApiController.handleCreateNewUser);
  router.put("/edit-user", userApiController.handleEditUser);
  router.delete("/delete-user", userApiController.handleDeleteUser);

  //allCode
  router.get("/allcode", allcodeApiController.getAllCode);

  //get doctor
  router.get("/top-doctor-home", doctorApiController.getTopDoctorHome);
  router.get("/get-all-doctors", doctorApiController.getAllDoctors);
  router.post("/save-info-doctor", doctorApiController.postInfoDoctor);
  router.get(
    "/get-detail-doctor-by-id",
    doctorApiController.getDetailDoctorById
  );
  router.post("/bulk-create-schedule", doctorApiController.bulkCreateSchedule);
  router.get(
    "/get-schedule-doctor-by-date",
    doctorApiController.getScheduleDoctorByDate
  );
  router.get(
    "/get-extra-info-doctor-by-id",
    doctorApiController.getExtraInfoDoctorById
  );
  router.get(
    "/get-profile-doctor-by-id",
    doctorApiController.getProfileDoctorById
  );
  router.get(
    "/get-list-patient-for-doctor",
    doctorApiController.getListPatient
  );

  router.post("/send-remedy", doctorApiController.sendRemedy);

  //benh nhan dat lich hen
  router.post(
    "/patient-book-appointment",
    patientApiController.postBookAppointment
  );
  router.post(
    "/verify-book-appointment",
    patientApiController.verifyBookAppointment
  );

  router.post("/create-new-specialty", specialtyApiController.createSpecialty);
  router.get("/get-all-specialty", specialtyApiController.getAllSpecialty);
  router.get(
    "/get-detail-specialty-by-id",
    specialtyApiController.getDetailSpecialtyById
  );

  router.post("/create-new-clinic", clinicApiController.createClinic);
  router.get("/get-all-clinic", clinicApiController.getAllClinic);
  router.get(
    "/get-detail-clinic-by-id",
    clinicApiController.getDetailClinicById
  );

  return app.use("/api", router);
};

module.exports = innitApiRoutes;
