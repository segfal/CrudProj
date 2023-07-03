import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCampuses } from "../redux/Campus.actions";
import StudentsOnCampus from "../components/StudentsOnCampus";
import { fetchStudentsThunk } from "../redux/Students.actions";
import { useDispatch, useSelector } from "react-redux";
import studentReducer from "../redux/Students.reducer";

const SingleCampus = (props) => {
  const { campusId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleCampus, setSingleCampus] = useState([]); //this is the data that we get from the backend
  const [allStud, setAllStud] = useState([]);
  const dispatch = useDispatch();
  const allStudents = useSelector((state) => state.campuses.allStudents);

  const fetchAllStudents = async () => {
    try{
        const res = await dispatch(fetchStudentsThunk());
        console.log('RUNNING DISPATCH FROM FETCHALLSTUDENTS');
    } catch (error){
        console.log("An error occured", error);
    }
};
// trying to access all students from single campus

// Load database campuses upon mount
useEffect(() => {
    console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
    setAllStud(fetchAllStudents());
  }, []);

  const campuses = fetchCampuses();
  const campusUrl = `http://localhost:8080/routes/campuses/SingleCampus/${campusId}`;
  useEffect(()=>{
    fetch(campusUrl)
    .then((res) => res.json())
    .then((data) => { //data is the response from the backend
      console.log(data);
      setSingleCampus(data); //this is the data that we get from the backend
    })
    .catch((err) => console.log(err));
  },[]);


  return (
    <div>
      <h1>Learn more about {singleCampus.name}</h1>
      <img src={singleCampus.imageUrl} alt="campus image" />
      <h2> Campus Name: {singleCampus.name} </h2> 
      <h2> Campus Address: {singleCampus.address} </h2>
      <h2> Campus Description: {singleCampus.description} </h2>
      <button type="button" className="btn btn-success">
        Edit
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
      <h2>Students on campus</h2>
      <button>Add Student</button>
      <StudentsOnCampus id = {campusId} allStudents = {allStudents}/>
    </div>
  );
};

export default SingleCampus;
