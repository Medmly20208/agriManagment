const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    secondname: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    adress: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    coursedocument: {
      type: String,
      required: false,
      trim: true,
    },
    cv: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Instructorcsf = mongoose.model("Instructors", instructorSchema);

module.exports = Instructorcsf;
