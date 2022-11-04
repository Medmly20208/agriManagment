const router = require("express").Router();
const multer = require("multer");
const consultants = require("../models/mpmeconsultants.model");

router.route("/").get((req, res) => {
  consultants
    .find()
    .then((consultants) => res.json(consultants))
    .catch((err) => res.status(400).json("Error: " + err));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single("CV");

router.route("/add").post(upload, (req, res) => {
  const name = req.body.name;
  const field = req.body.field;
  const deadline = req.body.deadline;
  const { file } = req;
  const newConsultant = new consultants({
    name,
    field,
    deadline,
    CV: (file && file.path) || null,
  });

  newConsultant
    .save()
    .then(() => res.json("consultant Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  consultants
    .findByIdAndDelete(req.params.id)
    .then(() => res.json(`consultant of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/:id").post((req, res) => {
  consultants
    .findById(req.params.id)
    .then((consultant) => {
      const document = { req };
      consultant.name = req.body.name;
      consultant.field = req.body.field;
      consultant.deadline = req.body.deadline;
      consultant.document = document;

      consultant
        .save()
        .then(() => res.json("consultant updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
