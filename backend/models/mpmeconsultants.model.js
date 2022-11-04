const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consultantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
      trim: true,
    },
    CV: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const consultant = mongoose.model("consultants", consultantSchema);

module.exports = consultant;
