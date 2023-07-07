import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../redux/Campus.actions";
import StudentsOnCampus from "../components/StudentsOnCampus";
import { fetchStudents } from "../redux/Students.actions";
import { fetchStudentsThunk } from "../redux/Students.actions";
import { useDispatch, useSelector } from "react-redux";
import studentReducer from "../redux/Students.reducer";
import EditCampus from "../components/EditCampus";
import axios from "axios";


const SingleCampus = (props) => {
  const navigate = useNavigate();

  const campusId = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleCampus, setSingleCampus] = useState([]); //this is the data that we get from the backend
  const [intCampId, setIntCampId] = useState(0);
  // Get all students
  const allStudents = useSelector((state) => {
    console.log("STATE: ", state);
    return state.students.allStudents;
  });
  console.log("all students from single campus . jsx" , allStudents);

  console.log();
  console.log("data: " + allStudents);
  const [everyStudent, setEveryStudent] = useState([]);
  const dispatch = useDispatch();

  const fetchAllStudents = async () => {
    try {
      const res = await dispatch(fetchStudentsThunk());
      console.log("RUNNING DISPATCH FROM FETCHALLSTUDENTS");
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  useEffect(() => {
    console.log("FETCH ALL STUDENTS FIRING IN USEEFFECT");
    setEveryStudent(fetchAllStudents());
    setIntCampId(parseInt(campusId.id));
  }, []);

  const campusUrl = `http://localhost:8080/routes/campuses/SingleCampus/${campusId.id}`;

  useEffect(() => {
    fetch(campusUrl)
      .then((res) => res.json())
      .then((data) => {
        //data is the response from the backend
        console.log(data);
        setSingleCampus(data); //this is the data that we get from the backend
      })
      .catch((err) => console.log(err));
  }, []);

  //Redirects user to an edit form for the campus
  const handleEdit = () => {
    let path = `/editCampus/${campusId.id}`; 
    
    navigate(path);
  };

  const filterStudents = () => {
    // Assuming students holds all the students 
    // Filter is like an if-else statement, it will only return the filtered students if the condition is true
    console.log("all students HELLO WORLD: " , allStudents)
    const filteredStudents = allStudents.filter((student) => student.campusId === campusId);
    return filteredStudents;
  }

  const handleDelete = () => { //Deletes the campus through the backend does not need a compoonent for this just only
    console.log("students: " , filterStudents());
    axios.delete(`http://localhost:8080/routes/campuses/deletecampus/${campusId.id}`);
    navigate('/campuses');
    navigate(0);
    filterStudents().map((student) => {
      student.campusId = null;
    })
  };
  const handleImageError = (event) =>{
    event.target.src = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";
  }

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding:"10vh",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      borderRadius: "50px",
      marginBottom: "5vh"
    }}>
    <h1 className="card-heading">{singleCampus.name}</h1>
    <img src={singleCampus.imageUrl} onError={handleImageError} alt="campus image" className="singleIMG" />
    {/* <h2 className="card-text"><span className="card-text__label">Name:</span> {singleCampus.name}</h2> */}
    <h2 className="card-text"><span className="card-text__label">Address:</span> {singleCampus.location}</h2>
    <h2 className="card-text"><span className="card-text__label">Description:</span> {singleCampus.description}</h2>
    <div className="buttons-container">
      <button type="button" className="btn btn-success card-button" id="edit" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" className="btn btn-danger card-button" id="delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
    <h2 className="studentsOnCampus__head">Students enrolled at <span className="studentsOnCampus__campus-name">{singleCampus.name}</span></h2>
    <StudentsOnCampus currentCampusId={intCampId} allStudents={allStudents} />
  </div>
  
  );
};

export default SingleCampus;