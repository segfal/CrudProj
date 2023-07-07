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
    console.log(studentId.id);
    let path = `/editStudent/${studentId.id}`;
    navigate(path);
  };

  // Delete this student
  const handleDelete = () => { //Deletes the campus through the backend does not need a component for this just only onclick
    axios.delete(`http://localhost:8080/routes/students/deletestudent/${studentId.id}`); //deletes the campus through the backend
    navigate('/students'); //navigates to the students page
    navigate(0);
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

  const handleImageError = (event) => {
    event.target.src = "https://i.stack.imgur.com/l60Hf.png";
  }

  console.log("data for studentid: " , studentId);

  // if (studentInfo.campus.id) {
  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding:"10vh",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      borderRadius: "50px",
      marginBottom: "5vh"
    }}>
      <h1 className="card-heading">{studentInfo.firstName} {studentInfo.lastName}</h1>
      <img src={studentInfo.imageUrl} onError={handleImageError} alt="student image" className="singleIMG"/>
      {/* <h2 className="card-text"> <span className="card-text__label">Name:</span> {studentInfo.firstName} {studentInfo.lastName}</h2>  */}
      <h2 className="card-text"> <span className="card-text__label">E-mail:</span> {studentInfo.email} </h2>
      <h2 className="card-text"> <span className="card-text__label">GPA:</span> {studentInfo.gpa} </h2>
      <div className="buttons-container">
        <button type="button" className="btn btn-success card-button" id="edit" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" className="btn btn-danger card-button" id="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
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
    <div className="singleStudent__campus">
      <h2 className="singleStudent__campus-head">This student is enrolled at <span className="singleStudent__campus-name">{campus.name}</span></h2>
      <img src={campus.imageUrl} alt="student image" className="singleStudent__campus-img"></img>
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
    <div className="singleStudent__campus">
      <h1 className="singleStudent__campus-head">This student is not enrolled at a campus</h1>
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
        onClick = {(event) => handleAddCampus(event)}>Add to Campus
        </button>
    </div>
  )
};

export default SingleStudent;