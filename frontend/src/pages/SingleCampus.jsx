import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



//how to pass props from single campus using navigate?


const SingleCampus = (props) => {
//  const navigate =useNavigate();

//  let path = '/SingleCampus/*';
//  navigate(path, {state.props}); 

  return (
    <div>
      <h1>Welcome to the Single Campus View</h1>
      <button type="button" className="btn btn-success">
        Edit
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default SingleCampus;
