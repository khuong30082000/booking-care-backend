const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking-care", "root", null, {
  host: "localhost",
  dialect: "mysql",
  // logging: "false", in ra câu lenh select
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
