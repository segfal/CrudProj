import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../redux/Campus.actions";

const SingleCampus = (props) => {
  const { campusId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleCampus, setSingleCampus] = useState([]); //this is the data that we get from the backend

  const campus = fetchCampuses();
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
      <StudentsOnCampus/>
    </div>
  );
};

export default SingleCampus;
