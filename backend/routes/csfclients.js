const router = require("express").Router();
const Client = require("../models/csfclients.model");

router.route("/").get((req, res) => {
  Client.find()
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const place = req.body.place;

  const newClient = new Client({ name, place });

  newClient
    .save()
    .then(() => res.json("Client Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json(`client of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/:id").post((req, res) => {
  Client.findById(req.params.id)
    .then((client) => {
      client.name = req.body.name;
      client.place = req.body.place;

      client
        .save()
        .then(() => res.json("client updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
