import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditStudent = () => {
  const { studentId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState("");
  const [emailError, setEmailError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else if (name === "gpa") {
      setGpa(value);
    }
  };

  // handle the form submission
  const handleForm = async (event) => {
    event.preventDefault();

    if(!validateEmail(email)){
       setEmailError('Email is required')
    } setEmailError('')
    console.log({firstName, lastName, email, imageUrl, gpa})

    // await axios.put(`http://localhost:8080/Routes/students/updatestudent/${studentId}`,
    // firstName, lastName, email, imageUrl, gpa
    // )

    console.log({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
    });
        // Make a PUT request to update the student data
    await axios.put(
      `http://localhost:8080/Routes/students/updatestudent/${studentId}`,
      { firstName, lastName, email, imageUrl, gpa }
    );
  };
  //this is supposed to validate email form
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  return (
    <div>
      <h1>Edit a new student through this form</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="firstName">Student's First Name:</label>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Student's Last Name:</label>
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
         <label htmlFor="email">Student Email:</label>
        <input
          type="text"
          placeholder="student.name@gmail.com"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {emailError && <p className="error">{emailError}</p>}
        <label htmlFor="imageUrl">Student Image URL:</label>
        <input
          type="url"
          placeholder="http://www.image.com/"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Student Image URL:</label>
        <input
          type="url"
          placeholder="http://www.image.com/"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="gpa">Student GPA:</label>
        <input
          type="text"
          placeholder="4.00"
          name="gpa"
          value={gpa}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditStudent;
