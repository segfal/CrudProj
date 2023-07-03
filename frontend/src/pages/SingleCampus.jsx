import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../redux/Campus.actions";


//how to pass props from single campus using navigate?


const SingleCampus = (props) => {
  //trying this:
  const { campusId } = useParams(); //the params allows u to access the campusId from URL parameters
  const [singleCampus, setSingleCampus] = useState([]);

  //what the useParams thing does is basically, since we have the route:
  // <Route path="/SingleCampus/:campusId" component={SingleCampus} />
 //then the params will be referring to the part that says :campusId, aka the tab that this leads to
// backend: req.params
 const campus = fetchCampuses();
 console.log(campus);


 console.log(campusId);
 const campusUrl = `http://localhost:8080/routes/campuses/SingleCampus/${campusId}`;
 useEffect(()=>{
    fetch(campusUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setSingleCampus(data);
    })
    .catch((err) => console.log(err));
 },[]);


  return (
    <div>
      <h1>Welcome to the Single Campus View</h1>
      <button type="button" className="btn btn-success">
        Edit
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
      <h2> Campus ID: {campusId} </h2>
      <h2> Campus Name: {singleCampus.name} </h2> 
      <h2> Campus Address: {singleCampus.address} </h2>
      <h2> Campus Description: {singleCampus.description} </h2>
      <img src={singleCampus.imageUrl} alt="campus image" />
      

    </div>
  );
};

export default SingleCampus;
