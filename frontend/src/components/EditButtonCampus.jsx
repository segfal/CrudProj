import React from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import EditCampus from "../pages/EditCampus";



function EditButtonCampus({campusId}) {
  const campId = campusId;

  const navigate = useNavigate();

  console.log("the campus id you're trying to edit is: " ,campId );

    
       //Redirects user to an edit form for the campus
       const handleSubmit = () => {
        try {
          let path = `/EditCampus/${campId}`;
          navigate(path);
        } catch (error) {
          console.log(error);
        }
       
       };

      return (
        <button type="button" className="btn btn-success" onSubmit={handleSubmit}>
        Edit
      </button>
      );
}

export default EditButtonCampus;
