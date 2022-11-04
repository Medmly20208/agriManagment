const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.Port || 5000;

app.use(express.json());
app.use(express.static("public"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo db database connection established succesfullly");
});

const courseRouter = require("./routes/csfcourses");
const instructorRouter = require("./routes/csfinstructors");
const csfclientRouter = require("./routes/csfclients");
const csfsessions = require("./routes/csfsessions");
const mpmeconsultant = require("./routes/mpmeconsultants");
const mpmejuridiqueDoc = require("./routes/mpmejuridiquedoc");
const mpmetechniquedoc = require("./routes/mpmetechniquedoc");
const mpmebanqairedoc = require("./routes/mpmebanqairedoc");

app.use("/csfcourses", courseRouter);
app.use("/csfinstructors", instructorRouter);
app.use("/csfclients", csfclientRouter);
app.use("/csfsessions", csfsessions);
app.use("/mpmeconsultant", mpmeconsultant);
app.use("/mpmejuridiqueDoc", mpmejuridiqueDoc);
app.use("/mpmetechniqueDoc", mpmetechniquedoc);
app.use("/mpmebanqairedoc", mpmebanqairedoc);

app.listen(port, () => {
  console.log("listening on port", port);
});
