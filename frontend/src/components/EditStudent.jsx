import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleStudent from "../pages/SingleStudent";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const studentId = useParams();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0.0,
    campusId: null,
  });
  const [emailError, setEmailError] = useState("");

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(state.email)) {
      setEmailError("Invalid email address");
      return;
    }

    console.log(studentId);
    const response = await axios.put(
      `http://localhost:8080/routes/students/updatestudent/${studentId.id}`,
      {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        imageUrl: state.imageUrl,
        gpa: state.gpa,
        campusId: state.campusId,
      }
    );

    console.log("response", response);

    navigate(`/SingleStudent/${studentId.id}`);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
        {emailError && <p className="error">{emailError}</p>}
        <label htmlFor="gpa">GPA</label>
        <input
          name="gpa"
          type="text"
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
