const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const banqaireSchema = new Schema(
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

const banqaireDoc = mongoose.model("banqaireDocuments", banqaireSchema);

module.exports = banqaireDoc;
