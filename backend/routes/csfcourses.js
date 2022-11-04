const router = require("express").Router();
const Course = require("../models/csfcourses.model");

router.route("/").get((req, res) => {
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all courses that start with a specific sentence
router.route("/findAllMatchs/:sentence").get((req, res) => {
  const regex = new RegExp(req.params.sentence, "i"); // i for case insensitive

  Course.find({ name: { $regex: regex } })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const field = req.body.field;

  const newCourse = new Course({ name, field });

  newCourse
    .save()
    .then(() => res.json("Course Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json(`course of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/UpdateCourse/:id").post((req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      console.log(course.name);

      course.name = req.body.name;
      course.field = req.body.field;

      course
        .save()
        .then(() => res.json("course updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
