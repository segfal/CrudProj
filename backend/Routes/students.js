const express = require("express");
const router = require('express').Router();
const {Student, findStudents} = require('../DB/Models/students');



router.get('/', async (req, res,next) => {
    try{
        //if find all is null, send 404
        
        const allStudents = await findStudents();
        
        allStudents ? res.status(200).json(allStudents) : res.status(404).send("No students found");
    } catch(error) {
        next(error);
    }

});




router.post('/addstudent', async (req, res, next) => {
    try{
        console.log(req.body);
        const newStudent = await Student.create(req.body);
    
        res.status(201).json(newStudent);
    } catch (error){
        console.log("An error occured", error)
    }
}); 

router.delete('/deletestudent/:id', async (req, res, next) => {
    try{
        const studentToDelete = await Student.findByPk(req.params.id);
        studentToDelete.destroy();
        res.status(204).send("Student deleted");
    }
    catch(error){
        next(error);
    }
});

const studentExists = async (studentInput) => {
    if(!studentInput){
        return false;
    }
    const student = await Student.findByPk(studentInput.id);
    return student ? true : false;

    
}


router.put('/updatestudent/:id', async (req, res, next) => {
    try{
        const studentToUpdate = await Student.findByPk(req.params.id);
        if(studentToUpdate){
            await studentToUpdate.update(req.body);
            res.status(200).json(studentToUpdate);
        }
        else{
            res.status(404).send("Student not found");
        }
    }
    catch(error){
        next(error);
    }
});


module.exports = router;