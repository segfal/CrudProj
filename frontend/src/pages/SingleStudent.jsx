import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudents } from "../redux/Students.actions";
import { useDispatch, useSelector } from "react-redux";
import campusReducer from "../redux/Campus.reducer";
import { fetchCampusesThunk } from "../redux/Campus.actions";
import axios from "axios";
import EditStudent from "./EditStudent";

const SingleStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleStudent, setSingleStudent] = useState([]); //this is the data that we get from the backend
  const allCampuses = useSelector((state) => state.campuses.allCampuses); // get all campuses from redux store
  const dispatch = useDispatch(); // used to dispatch an action to redux store
  const [allCamp, setAllCamp] = useState([]); // used to store all campuses from redux store
  console.log("allCampuses: ", allCampuses);
  
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

  const fetchAllCampuses = async () => {
    try{
        const res = await dispatch(fetchCampusesThunk());
        console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES');
    } catch (error){
        console.log("An error occured", error);
    }
};

// Load database campuses upon mount
useEffect(() => {
    console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
    setAllCamp(fetchAllCampuses());
  }, []);

  const studentCampus = (campid) => allCampuses.filter((campus)=>campus.id===campid);
  console.log("all campuses from single student 47", allCampuses);
  const campusRelationship = (campid) => {
    if (!(campid===null)) {
      return (
        <div>
          <h1>This student is registered to a campus</h1>
          <h2>{studentCampus(campid)[0].name}</h2>
          
          {/* {console.log("segfal: ",studentCampus(campid)[0].name)} */}
          {console.log("campus id 54: ", campid)}
          {console.log("student campus: ", studentCampus(campid))}
          {console.log("student's campus name: ", studentCampus(campid).name)}
          {console.log("zero: ",studentCampus(campid)[0].imageUrl)}
        
          <img src={studentCampus(campid)[0].imageUrl} alt="campus image"/>
          {console.log("student's campus image: ", studentCampus(campid).imageUrl)}
        </div>
      );
    } else {
      return (
        <div>
          <h1>This student is not registered to a campus</h1>
          <select>
          {allCampuses.map((campus) => (
            <option key = {campus.id}>{campus.name}</option>
          ))}
          </select>
        </div>
      )
    }
  }

  //Navigate to editing student
  const handleEdit = () => {
    let path = `/editStudent/${studentId}`;
    navigate(path);
  };
  //Delete this student
  const handleDelete = () => { //Deletes the campus through the backend does not need a compoonent for this just only onclick
    axios.delete(`http://localhost:8080/routes/students/deletestudent/${studentId}`); //deletes the campus through the backend
    navigate('/students'); //navigates to the students page
  };

  return (
    <div>
      <h1>Learn more about {singleStudent.firstName} {singleStudent.lastName}</h1>
      <img src={singleStudent.imageUrl} alt="student image" />
      <h2> Student Name: {singleStudent.firstName} {singleStudent.lastName}</h2> 
      <h2> Student E-mail: {singleStudent.email} </h2>
      <h2> Student GPA: {singleStudent.gpa} </h2>
      <button type="button" className="btn btn-success" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      {campusRelationship(singleStudent.campusId)}
    </div>
  );
};

export default SingleStudent;