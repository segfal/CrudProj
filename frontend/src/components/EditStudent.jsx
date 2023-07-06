import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleStudent from "../pages/SingleStudent";
import { useParams,useNavigate } from "react-router-dom";
import { editSingleStudentThunk } from "../redux/Students.actions";
import { useDispatch } from "react-redux";


const EditStudent = () => {

  const navigate = useNavigate();
  const studentId = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0.0,
    campusId: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "firstName"){
      setState({
        ...state,
        firstName: value,
      });
    }
    if(name === "lastName"){
      setState({
        ...state,
        lastName: value,
      });
    }
    if(name === "email"){
      setState({
        ...state,
        email: value,
      });
    }
    if(name === "imageUrl"){
      setState({
        ...state,
        imageUrl: value,
      });
    }
    if(name === "gpa"){
      setState({
        ...state,
        gpa: value,
      });
    }

  };
 
  //takes student id and updates the student
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    dispatch(editSingleStudentThunk(studentId.id,{
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      imageUrl: state.imageUrl,
      gpa: state.gpa,
      campusId: state.campusId,
  }));



    
    //console.log("response", response);

    navigate(`/SingleStudent/${studentId.id}`);

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          type="text"
          value={state.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="text"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter student e-mail"
        />
        <label htmlFor="gpa">GPA</label>
        <input  
          name="gpa"
          type=""
          value={state.gpa}
          onChange={handleChange}
          placeholder="Enter student gpa"
        />
        <label htmlFor="imageUrl">Image Url</label>
        <input
          name="imageUrl"
          type="text"
          value={state.imageUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default EditStudent;
