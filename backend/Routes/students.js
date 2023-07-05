const express = require("express");
const router = require("express").Router();
const { Student } = require("../db/models");

// Fetch all students DONE
router.get("/", async (req, res, next) => {
  try {
    console.log("getting all students");
    const allStudents = await Student.findAll();

    allStudents
      ? res.status(200).json(allStudents)
      : res.status(404).send("No students found");
  } catch (error) {
    next(error);
  }
});

// Fetch single student
router.get("/SingleStudent/:id", async (req, res, next) => {
  try {
    //finds a single id based on the param request
    const singleStudent = await Student.findByPk(req.params.id);
    
    singleStudent
      ? res.status(200).json(singleStudent)
      : res.status(404).send("No Student Found");
  } catch (error) {
    next(error);
    console.log(error);
  }
});


// add new student DONE
router.post("/addstudent", async (req, res, next) => {
  try {
    if (req.body.gpa < 0.0 || req.body.gpa > 4.0) {
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
    //Fetch student id
    const studentId = req.params.id;
    console.log(req.body.id);

    //Await student api call
    const findStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    //if condition to check if data exists for that ID #
    if (!findStudent) {
      console.log("Student does not exist");
      res.status(404).json({ error: "Student not found" });
    } else {
      //If found, update the student data
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



router.delete("/deletestudent/:id", async (req, res, next) => {
  try {
    console.log(req.body.id);
    const deletedStudent = await student.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedStudent);
  } catch (error) {
    console.log("Delete Failed");
  }
});

module.exports = router;
