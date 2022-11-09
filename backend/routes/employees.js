const router = require("express").Router();
const Employees = require("../models/employees.model");

router.route("/:clientid").get((req, res) => {
  Employees.find({ clientid: req.params.clientid })
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const title = req.body.title;
  const clientid = req.body.clientid;

  const newEmployee = new Employees({ firstname, lastname, title, clientid });

  newEmployee
    .save()
    .then(() => res.json("Employee Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Employees.findByIdAndDelete(req.params.id)
    .then(() => res.json(`employee of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/updateemployee/:id").post((req, res) => {
  Employees.findById(req.params.id)
    .then((employee) => {
      //change just the fields that exist in req.body
      for (let i of Object.keys(req.body)) {
        if (req.body[i] === "") {
          continue;
        }

        employee[i] = req.body[i];
      }

      employee
        .save()
        .then(() => res.json("employee updtaed"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
