const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeesSchema = new Schema(
  {
    clientid: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = Employee;
