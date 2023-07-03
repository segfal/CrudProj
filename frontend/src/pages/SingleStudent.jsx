import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchStudents } from "../redux/Students.actions";





const SingleStudent = (props) => {
  const { studentId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleStudent, setSingleStudent] = useState([]); //this is the data that we get from the backend
  const navigate = useNavigate();
  const student = fetchStudents();
  
  
  const handleAdd = () => {
    let path = `/deleteStudent/`; //idk why we are using this 
    navigate(path);  
  };
  const studentUrl = `http://localhost:8080/routes/students/SingleStudent/${studentId}`;
  console.log(studentUrl);
  
  useEffect(() => {
    fetch(studentUrl)
      .then((res) => res.json())
      .then((data) => { //data is the response from the backend
        console.log(data);
        setSingleStudent(data); //this is the data that we get from the backend
      })
      .catch((err) => console.log(err));
  }, []);





  return (
    <div>
      <h1>Welcome to the Single Student View</h1>
      <button type="button" className="btn btn-danger" onClick={handleAdd}> 
        Delete
      </button>
      <h2> Student ID: {studentId} </h2>
      <h2> Student Name: {singleStudent.firstName} {singleStudent.lastName} </h2>
      <h2> Student Email: {singleStudent.email} </h2>
      <h2> Student GPA: {singleStudent.gpa} </h2>
      <img src={singleStudent.imageUrl} alt="student image" />
      
    </div>
  );
};

export default SingleStudent;
