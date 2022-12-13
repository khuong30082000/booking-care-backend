import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./router/web";
import initApiRoutes from "./router/api";
import connectDB from "./config/connectDB";
import configCors from "./config/cors";
require("dotenv").config();

const app = express();

//config app
configCors(app);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);

initApiRoutes(app);
initWebRoutes(app);

//connect Database
connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("backend Nodejs is running : " + port);
});
