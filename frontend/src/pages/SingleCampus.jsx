import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../redux/Campus.actions";


//how to pass props from single campus using navigate?


const SingleCampus = (props) => {
  //trying this:
  const { campusId } = useParams(); //the params allows u to access the campusId from URL parameters
  //what the useParams thing does is basically, since we have the route:
  // <Route path="/SingleCampus/:campusId" component={SingleCampus} />
 //then the params will be referring to the part that says :campusId, aka the tab that this leads to
// backend: req.params
 const campus = fetchCampuses();

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
    </div>
  );
};

export default SingleCampus;
