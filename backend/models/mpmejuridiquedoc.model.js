const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const juridiqueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
      trim: true,
    },
    document: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const juridiqueDoc = mongoose.model("juridiqueDocuments", juridiqueSchema);

module.exports = juridiqueDoc;
