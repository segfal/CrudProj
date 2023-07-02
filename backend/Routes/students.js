const express = require("express");
const router = require("express").Router();
const { Student, findStudents } = require("../DB/Models/students");

// Fetch all students DONE
router.get("/", async (req, res, next) => {
  try {
    //if find all is null, send 404

    const allStudents = await findStudents();

    allStudents
      ? res.status(200).json(allStudents)
      : res.status(404).send("No students found");
  } catch (error) {
    next(error);
  }
});

// add new student DONE
router.post("/addstudent", async (req, res, next) => {
  try {
    //console.log(req.body);
    //console.log(req.body.gpa);

    if (req.body.gpa < 0.0 || req.body.gpa > 4.0) {
      // if gpa is not between 0 and 4
      res.status(500);
      console.log(res.status(500)); //test what's happening
      // 500 sends to the user :"thats not good"
      return false;
    }
    const newStudent = await Student.create(req.body); //create new student

    res.status(201).json(newStudent); //return json of new student
  } catch (error) {
    console.log("An error occured", error); // if error, console log it
  }
});

//TODO: delete student
router.delete("/deletestudent", async (req, res, next) => {
  try {
    console.log(req.body.id);
    const deleteStudent = await Student.destroy({
      where: {
        firstName: req.body.firstName,
      },
    });
    res.status(200).json(deleteStudent);
  } catch (error) {
    console.log("Delete Failed");
  }
});

//TODO: update student
router.put("/updatestudent/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    console.log(req.body.id);

    const findStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    if (!findStudent) {
      console.log("Student does not exist");
      res.status(404).json({ error: "Student not found" });
    } else {
      const updateStudent = await findStudent.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        gpa: req.body.gpa,
      });

      console.log("Student updated successfully");
      res.status(200).json(updateStudent);
    }
  } catch (error) {
    console.log("Update Failed");
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
