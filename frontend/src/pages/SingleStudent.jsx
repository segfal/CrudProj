import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchStudents } from "../redux/Students.actions";

const SingleStudent = (props) => {
  const { studentId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleStudent, setSingleStudent] = useState([]); //this is the data that we get from the backend

  const student = fetchStudents();
  const studentUrl = `http://localhost:8080/routes/students/SingleStudent/${studentId}`;
  useEffect(()=>{
    fetch(studentUrl)
    .then((res) => res.json())
    .then((data) => { //data is the response from the backend
      console.log(data);
      setSingleStudent(data); //this is the data that we get from the backend
    })
    .catch((err) => console.log(err));
  },[]);


  return (
    <div>
      <h1>Learn more about {singleStudent.firstName} {singleStudent.lastName}</h1>
      <img src={singleStudent.imageUrl} alt="student image" />
      <h2> Student Name: {singleStudent.firstName} {singleStudent.lastName}</h2> 
      <h2> Student E-mail: {singleStudent.email} </h2>
      <h2> Student GPA: {singleStudent.gpa} </h2>
      <button type="button" className="btn btn-success">
        Edit
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default SingleStudent;
