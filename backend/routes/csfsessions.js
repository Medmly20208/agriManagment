const router = require("express").Router();
const Session = require("../models/csfsessions.model.js");

router.route("/").get((req, res) => {
  Session.find()
    .then((sessions) => res.json(sessions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const instructorId = req.body.InstructorId;
  const host = req.body.host;
  const course = req.body.course;
  const instructor = req.body.instructor;
  const place = req.body.place;
  const time = req.body.time;

  const newSession = new Session({
    instructorId,
    host,
    course,
    instructor,
    place,
    time,
  });

  newSession
    .save()
    .then(() => res.json("Session Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then(() => res.json(`session of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/:id").post((req, res) => {
  Session.findById(req.params.id)
    .then((session) => {
      session.instructorId = req.body.instructorId;
      session.host = req.body.host;
      session.course = req.body.course;
      session.instructor = req.body.instructor;
      session.place = req.body.place;
      session.time = req.body.time;

      session
        .save()
        .then(() => res.json("session updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/instructorSessiosn/:id").get((req, res) => {
  Session.find({ instructorId: req.params.id })
    .then((sessions) => res.json(sessions))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
