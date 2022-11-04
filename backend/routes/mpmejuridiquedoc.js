const router = require("express").Router();
const multer = require("multer");
const JuridiqueDocs = require("../models/mpmejuridiquedoc.model");

router.route("/").get((req, res) => {
  JuridiqueDocs.find()
    .then((juridiqueDoc) => res.json(juridiqueDoc))
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

const upload = multer({ storage }).single("document");

router.route("/add").post(upload, (req, res) => {
  const name = req.body.name;
  const deadline = req.body.deadline;
  const { file } = req;
  const newJuridique = new JuridiqueDocs({
    name,
    deadline,
    document: (file && file.path) || null,
  });

  newJuridique
    .save()
    .then(() => res.json("Juridique document Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  JuridiqueDocs.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json(`Juridique document of id ${req.params.id} is deleted`)
    )
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/:id").post((req, res) => {
  JuridiqueDocs.findById(req.params.id)
    .then((JurDoc) => {
      const { file } = req;
      JurDoc.name = req.body.name;
      JurDoc.field = req.body.field;
      JurDoc.deadline = req.body.deadline;
      JurDoc.document = file;

      JurDoc.save()
        .then(() => res.json("juridique document updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
