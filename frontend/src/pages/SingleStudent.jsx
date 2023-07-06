import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditStudent from "../components/EditStudent";
import { fetchSingleStudentThunk } from "../redux/Students.actions";
import { fetchStudents } from "../redux/Students.actions";
import { fetchCampusesThunk } from "../redux/Campus.actions";

const SingleStudent = () => {
  const navigate = useNavigate();
  const studentId  = useParams(); //the params allows u to access the campusId from URL parameters
  const dispatch = useDispatch(); // used to dispatch an action to redux store
  const studentInfo = useSelector((state) => state.students.singleStudent);
  
  
  const student = fetchSingleStudentThunk();
  //const studentUrl = `http://localhost:8080/routes/students/SingleStudent/${studentInfo.id}`;
  
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

  // Loading page to allow for eager loading to have the time to occur before displaying full page
  if (!studentInfo.firstName) { // if studentInfo exists -> studentInfo is truthy
    return (
      <div>
        <h1>Loading</h1>
        <h1>Woah there you're refreshing too fast</h1>
      </div>
    );
  }

  // if (studentInfo.campus.id) {
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
      {studentInfo.campus ? <Campus campus={studentInfo.campus}/> : <NoCampus studentInfo={studentInfo}/>}
    </div>
  )
  // } 
};

const Campus = ({campus}) => {
  const navigate = useNavigate();

  // Redirect to single campus page on click of See More button
  const handleSeeMore = (campusId) => {
    let path = `/SingleCampus/${campusId}`; 
    navigate(path); 
  }
  return (
    <div>
      <h1>This student is registered to a campus</h1>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="student image"></img>
      <button type = 'button' 
        class='btn btn-primary'
        onClick = {() => handleSeeMore(campus.id)}>See More
      </button>
    </div>
  )
};

const NoCampus = ({studentInfo}) => {
  const allCampuses = useSelector((state) => state.campuses.allCampuses)
  const [allCamp, setAllCamp] = useState([]);
  const dispatch = useDispatch();
  const [newCampusId, setNewCampusId] = useState(0);
  const navigate = useNavigate();

  // Fetch all campuses
  const fetchAllCampuses = async () => {
    try{
        const res = await dispatch(fetchCampusesThunk());
        console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES');
        // return dispatch(fetchCampusesThunk());
    } catch (error){
        console.log("An error occured", error);
    }
  };

  // Load database campuses upon mount
  useEffect(() => {
      console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
      setAllCamp(fetchAllCampuses());
    }, []);

  const handleSelectChange = (event) => {
    setNewCampusId(event.target.value);
  }




  const handleAddCampus = async () => {
    // assign student's campusId the newCampusId and refresh/redirect page
    const res = await axios.put(`http://localhost:8080/routes/students/updatestudent/${studentInfo.id}`, {campusId: newCampusId});
    navigate(0);
  }

  return (
    <div>
      <h1>This student is not registered to a campus</h1>
      <select onChange= {(event) => handleSelectChange(event)}>
        <option>Choose a campus</option>
        {allCampuses.map((campus) => {
          {console.log("campus in map", campus)}
          return (
            <option value={campus.id} key={campus.id}>{campus.name}</option>
          )
        })}
      </select>
      <button type = 'button' 
        class='btn btn-primary'
        onClick = {(event) => handleAddCampus(event)}>Add to campus
      </button>
    </div>
  )
};

export default SingleStudent;