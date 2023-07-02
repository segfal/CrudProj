const express = require("express");
const router = require('express').Router();
const {Student, findStudents} = require('../DB/Models/students');


// Fetch all students DONE
router.get('/', async (req, res,next) => {
    try{
        //if find all is null, send 404
        
        const allStudents = await findStudents();
        
        allStudents ? res.status(200).json(allStudents) : res.status(404).send("No students found");
    } catch(error) {
        next(error);
    }

});


// add new student DONE
router.post('/addstudent', async (req, res, next) => {
    try{
        //console.log(req.body);
        //console.log(req.body.gpa);

        if(req.body.gpa < 0.00 || req.body.gpa > 4.00){// if gpa is not between 0 and 4
            res.status(500);
            console.log(res.status(500)); //test what's happening
            // 500 sends to the user :"thats not good"
            return false;
        }
        const newStudent = await Student.create(req.body); //create new student
    
        res.status(201).json(newStudent); //return json of new student
    } catch (error){
        console.log("An error occured", error); // if error, console log it
    }
});


//TODO: delete student 
router.delete('/deletestudent/:id', async (req, res, next) => {
    try{
        const user = await user.findStudents({
            where: {
                id: req.body,
            }
        });

        if (user) {
            console.log('User exists.');
          } else {
            console.log('User does not exist.');
          }

    } catch(error){
        console.log("An Error has occured" , error);
    }

});





//TODO: update student
router.put('/updatestudent/:id', async (req, res, next) => {

});





module.exports = router;