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

  const { campusId } = useParams(); //the params allows u to access the campusId from URL parameters
  // <Route path = "/singleStudent/:studentId" element = {<SingleStudent/>} />
  // ^^ the params is the studentId part, for example
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
    setIntCampId(parseInt(campusId));
  }, []);

  // const campuses = fetchCampuses();
  const campusUrl = `http://localhost:8080/routes/campuses/SingleCampus/${campusId}`;

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
    let path = `/editCampus/${campusId}`; 
    navigate(path);
  };

  const filterStudents = () => {
    // Assuming students holds all the students 
    // Filter is like an if-else statement, it will only return the filtered students if the condition is true
    const filteredStudents = allStudents.filter((student) => student.campusId === campusId);
    return filteredStudents;
  }

  const handleDelete = () => { //Deletes the campus through the backend does not need a compoonent for this just only
    console.log("students: " , filterStudents());
    axios.delete(`http://localhost:8080/routes/campuses/deletecampus/${campusId}`);
    navigate('/campus');
    navigate(0);
    filterStudents().map((student) => {
      student.campusId = null;
    })
  };

  return (
    <div>
      {console.log("campusId is :" ,  campusId)}
      <h1>Learn more about {singleCampus.name}</h1>
      <img src={singleCampus.imageUrl} alt="campus image" />
      <h2> Campus Name: {singleCampus.name} </h2>
      <h2> Campus Address: {singleCampus.location} </h2>
      <h2> Campus Description: {singleCampus.description} </h2>

      <button type="button" className="btn btn-success" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <h2>Students on campus</h2>
      {/* <button type = 'button' 
        class='btn btn-primary'
        onClick = {(event) => handleAddCampus(event)}>Add students
      </button> */}
      <StudentsOnCampus currentCampusId={intCampId} allStudents={allStudents} />
    </div>
  );
};

export default SingleCampus;