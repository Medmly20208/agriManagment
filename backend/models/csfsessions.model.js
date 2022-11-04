const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionsSchema = new Schema(
  {
    instructorId: {
      type: String,
      required: false,
    },
    host: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Sessions", sessionsSchema);

module.exports = Session;
