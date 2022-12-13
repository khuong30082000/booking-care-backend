require("dotenv").config();
import nodemailer from "nodemailer";

const sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NTK 👻" <khuong30082000@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

const getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin Chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên NTK</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian:${dataSend.time}</b></div
    <div><b>Bác sĩ:${dataSend.doctorName}</b></div
    <p>Nếu các thông tin trên là đúng sự thật , vui lòng click vào đường link bên dưới để xác nhận</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click Here</a></div>
    <div>Xin chân thành cảm ơn</div>
    `;
  }

  if (dataSend.language === "en") {
    result = `<h3>hello ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên NTK</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian:${dataSend.time}</b></div
    <div><b>Bác sĩ:${dataSend.doctorName}</b></div
    <p>Nếu các thông tin trên là đúng sự thật , vui lòng click vào đường link bên dưới để xác nhận</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click Here</a></div>
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  return result;
};

const getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin Chào name !</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên NTK</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
  
    <div>Xin chân thành cảm ơn</div>
    `;
  }

  if (dataSend.language === "en") {
    result = `<h3>Dear name</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên NTK</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    
    <div>Thanks</div>
    `;
  }
  return result;
};

const sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NTK 👻" <khuong30082000@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line
    // plain text body
    html: getBodyHTMLEmailRemedy(dataSend), // html body
    attachments: [
      {
        filename: "text1.png",
        content: dataSend.imgBase64.split("base64")[1],
        encoding: "base64",
      },
    ],
  });
};

module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
