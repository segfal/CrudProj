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
  const [emailError, setEmailError] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0.0,
    campusId: null,
  });


  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(state.email)) {
      setEmailError("Invalid email address");
      return;
    }

    console.log(studentId);

    dispatch(editSingleStudentThunk(studentId.id, {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      imageUrl: state.imageUrl,
      gpa: state.gpa,
      campusId: state.campusId,
    }))
    navigate('/')
  }

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"  
            value={state.email}
            onChange={handleChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={state.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>GPA</label>
          <input
            type="text"
            name="gpa"
            value={state.gpa}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    
  )
}

export default EditStudent;
