const router = require("express").Router();
const multer = require("multer");
const Instructors = require("../models/csfinstructors.model");

router.route("/").get((req, res) => {
  Instructors.find()
    .then((instructor) => res.json(instructor))
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

const upload = multer({ storage }).fields([
  { name: "cv" },
  { name: "coursedocument" },
]);

router.route("/uploads").post(upload, (req, res) => {
  const { files } = req;

  console.log(files["coursedocument"][0].originalname);

  res.send({
    cvfile: files["cv"][0].originalname,
    cvpath: (files["cv"][0] && files["cv"][0].path) || null,

    coursedocumentfile: files["coursedocument"][0].originalname,
    coursedocumentpath:
      (files["coursedocument"][0] && files["coursedocument"][0].path) || null,
  });
});

router.route("/add").post(upload, (req, res) => {
  const {
    firstname,
    secondname,
    field,
    phonenumber,
    email,
    adress,
    city,
    coursedocument,
    cv,
  } = req.body;

  const { files } = req;

  const newInstructor = new Instructors({
    firstname,
    secondname,
    field,
    phonenumber,
    email,
    adress,
    city,
    coursedocument: files["coursedocument"][0].filename,
    cv: files["cv"][0].filename,
  });

  newInstructor
    .save()
    .then(() => res.json(" Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Instructors.findByIdAndDelete(req.params.id)
    .then(() => res.json(`course of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

//get all isntructor that their firstname has  specific sentence
router.route("/findAllMatchs/firstname/:sentence").get((req, res) => {
  const regex = new RegExp(req.params.sentence, "i"); // i for case insensitive

  Instructors.find({ firstname: { $regex: regex } })
    .then((instructors) => res.json(instructors))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all isntructor that their secondname has  specific sentence
router.route("/findAllMatchs/secondname/:sentence").get((req, res) => {
  const regex = new RegExp(req.params.sentence, "i"); // i for case insensitive

  Instructors.find({ secondname: { $regex: regex } })
    .then((instructors) => res.json(instructors))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all isntructor that their field has  specific sentence
router.route("/findAllMatchs/field/:sentence").get((req, res) => {
  const regex = new RegExp(req.params.sentence, "i"); // i for case insensitive

  Instructors.find({ field: { $regex: regex } })
    .then((instructors) => res.json(instructors))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Instructors.findById(req.params.id)
    .then((instructor) => {
      instructor.firstname = req.body.firstname;
      instructor.secondname = req.body.secondname;
      instructor.field = req.body.field;
      instructor.phonenumber = req.body.phonenumber;
      instructor.email = req.body.email;
      instructor.adress = req.body.adress;
      instructor.city = req.body.city;
      instructor.coursedocument = req.body.coursedocument;
      instructor.cv = req.body.cv;
      instructor
        .save()
        .then(() => res.json("instructor updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
