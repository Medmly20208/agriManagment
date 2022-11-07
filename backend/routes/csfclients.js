const router = require("express").Router();
const Client = require("../models/csfclients.model");

const clientAttributes = [
  "name",
  "juridiqueforme",
  "threeactivities",
  "activityfield",
  "adress",
  "fax",
  "phone",
  "email",
  "bankname",
  "bankaccountnumber",
  "creationdate",
  "icenumber",
  "patente",
  "identificationfiscal",
  "rcnumber",
  "cnssnumber",
  "chiffreaffireone",
  "fullnametrainingmanager",
  "titletrainingmanager",
  "fullnamelegalmanager",
  "titlelegalmanager",
  "numberofexecutives",
  "numberofemployees",
  "numberofworkers",
  "totalnumber",
  "iscompanyalreadybenefitedlastthreeyears",
  "cnssaffiliationregion",
  "personalphonenumber",
];

//get all clients
router.route("/").get((req, res) => {
  Client.find()
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error: " + err));
});

// add client
router.route("/add").post((req, res) => {
  const client = {};

  for (let i of clientAttributes) {
    client[i] = req.body[i];
  }

  const newClient = new Client({
    ...client,
  });

  newClient
    .save()
    .then(() => res.json("Client Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

//get all client that start with a specific sentence
router.route("/findAllMatchs/:sentence").get((req, res) => {
  const regex = new RegExp(req.params.sentence, "i"); // i for case insensitive

  Client.find({ name: { $regex: regex } })
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a client
router.route("/:id").delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json(`client of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

//update a client by id
router.route("/update/:id").post((req, res) => {
  Client.findById(req.params.id)
    .then((client) => {
      for (let i of clientAttributes) {
        client[i] = req.body[i];
      }

      client
        .save()
        .then(() => res.json("client updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
