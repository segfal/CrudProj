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
  const [emailError, setEmailError] = useState("");
  const [gpaError, setGpaError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const validateGpa = (gpa) => {
    const gpaRegex = /^\d+(\.\d+)?$/;
    return gpaRegex.test(gpa);
  };

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

    if(state.firstName.trim() == ''){
      setFirstNameError('Please enter a first name.')
    }
    if(state.lastName.trim() == ''){
      setLastNameError('Please enter a last name.')
    }
    if (!validateEmail(state.email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");

    const parsedGpa = parseFloat(state.gpa);
    if (!validateGpa(state.gpa) || isNaN(parsedGpa)) {
      setGpaError("Invalid input. Please enter a valid GPA (e.g., 4.00).");
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
    navigate('/students');
    navigate(0);
  }

  return (
    <div className="card-container">
      <div className="card">
        <h1 className="card-heading">Edit the student through this form</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="firstName" className="labels">Student's First Name:</label>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
              className="form-input"
            />
            {firstNameError && (
              <div className="alert alert-danger"> {firstNameError} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="labels">Student's Last Name:</label>
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              className="form-input"
            />
            {lastNameError && (
              <div className="alert alert-danger"> {lastNameError} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="labels">Student's Email:</label>
            <input
              type="text"
              placeholder="student.name@gmail.com"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="form-input"
            />
            {emailError && 
              (<div className="alert alert-danger">{emailError}</div> )} {/* Display the email error */}
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl" className="labels">Student's Image URL:</label>
            <input
              type="url"
              placeholder="http://www.image.com/"
              name="imageUrl"
              value={state.imageUrl}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gpa" className="labels">Student's GPA:</label>
            <input
              type="text"
              placeholder="4.00"
              name="gpa"
              value={state.gpa}
              onChange={handleChange}
              className="form-input"
            />
            {gpaError && (
              <div className="alert alert-danger">{gpaError}</div> )} 
              <p style= {{textAlign:"left", color:"blue"}}>You cannot type unless you enter a number. </p>
          </div>
          <div>
            <button className="submit-button" type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default EditStudent;
