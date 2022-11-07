const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    juridiqueforme: {
      type: String,
      required: false,
      trim: true,
    },
    threeactivities: {
      type: String,
      required: false,
      trim: true,
    },
    activityfield: {
      type: String,
      required: false,
      trim: true,
    },
    adress: {
      type: String,
      required: false,
      trim: true,
    },
    fax: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    bankname: {
      type: String,
      required: false,
      trim: true,
    },
    bankaccountnumber: {
      type: String,
      required: false,
      trim: true,
    },
    creationdate: {
      type: String,
      required: false,
      trim: true,
    },
    icenumber: {
      type: String,
      required: false,
      trim: true,
    },
    patente: {
      type: String,
      required: false,
      trim: true,
    },
    identificationfiscal: {
      type: String,
      required: false,
      trim: true,
    },
    rcnumber: {
      type: String,
      required: false,
      trim: true,
    },
    cnssnumber: {
      type: String,
      required: false,
      trim: true,
    },
    chiffreaffireone: {
      type: String,
      required: false,
      trim: true,
    },
    fullnametrainingmanager: {
      type: String,
      required: false,
      trim: true,
    },
    titletrainingmanager: {
      type: String,
      required: false,
      trim: true,
    },
    fullnamelegalmanager: {
      type: String,
      required: false,
      trim: true,
    },

    titlelegalmanager: {
      type: String,
      required: false,
      trim: true,
    },
    numberofexecutives: {
      type: Number,
      required: false,
      trim: true,
    },
    numberofemployees: {
      type: Number,
      required: false,
      trim: true,
    },
    numberofworkers: {
      type: Number,
      required: false,
      trim: true,
    },

    totalnumber: {
      type: Number,
      required: false,
      trim: true,
    },
    iscompanyalreadybenefitedlastthreeyears: {
      type: String,
      required: false,
      trim: true,
    },
    cnssaffiliationregion: {
      type: String,
      required: false,
      trim: true,
    },
    personalphonenumber: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
