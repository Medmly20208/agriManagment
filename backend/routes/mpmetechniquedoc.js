const router = require("express").Router();
const multer = require("multer");
const techniqueDoc = require("../models/mpmetechniquedoc.model");

router.route("/").get((req, res) => {
  techniqueDoc
    .find()
    .then((techniqueDoc) => res.json(techniqueDoc))
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
  const newTechnique = new techniqueDoc({
    name,
    deadline,
    document: (file && file.path) || null,
  });

  newTechnique
    .save()
    .then(() => res.json("Technique document Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  techniqueDoc
    .findByIdAndDelete(req.params.id)
    .then(() =>
      res.json(`Technique document of id ${req.params.id} is deleted`)
    )
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/:id").post((req, res) => {
  techniqueDoc
    .findById(req.params.id)
    .then((TechDoc) => {
      const { file } = req;
      TechDoc.name = req.body.name;
      TechDoc.field = req.body.field;
      TechDoc.deadline = req.body.deadline;
      TechDoc.document = file;

      TechDoc.save()
        .then(() => res.json("technqiue document updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
