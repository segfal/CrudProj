import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditStudent from "./EditStudent";
import { fetchSingleStudentThunk } from "../redux/Students.actions";
import { fetchStudents } from "../redux/Students.actions";

const SingleStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams(); //the params allows u to access the campusId from URL parameters
  const dispatch = useDispatch(); // used to dispatch an action to redux store
  const studentInfo = useSelector((state) => state.students.singleStudent);
  
  const student = fetchSingleStudentThunk();
  const studentUrl = `http://localhost:8080/routes/students/SingleStudent/${studentId}`;

  // Added fetch single student thunk
  useEffect(()=>{
    dispatch(fetchSingleStudentThunk(studentId));
  },[]);

  // Navigate to editing student
  const handleEdit = () => {
    let path = `/editStudent/${studentId}`;
    navigate(path);
  };

  // Delete this student
  const handleDelete = () => { //Deletes the campus through the backend does not need a compoonent for this just only onclick
    axios.delete(`http://localhost:8080/routes/students/deletestudent/${studentId}`); //deletes the campus through the backend
    navigate('/students'); //navigates to the students page
  };
  console.log("student info: ", studentInfo);
  console.log("t/f", studentInfo == true);
  if (!studentInfo.campus) { // if studentInfo exists -> studentInfo is truthy
    return (
      <div>
        <h1>Loading</h1>
        <h1>Woah there you're refreshing too fast </h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Learn more about {studentInfo.firstName} {studentInfo.lastName}</h1>
      <img src={studentInfo.imageUrl} alt="student image" />
      <h2> Student Name: {studentInfo.firstName} {studentInfo.lastName}</h2> 
      <h2> Student E-mail: {studentInfo.email} </h2>
      <h2> Student GPA: {studentInfo.gpa} </h2>
      <button type="button" className="btn btn-success" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <h1>This student is registered to a campus</h1>
      <h1>{studentInfo.campus.name}</h1>
      <img src={studentInfo.campus.imageUrl} alt="student image"></img>
    </div>
  )
};

export default SingleStudent;