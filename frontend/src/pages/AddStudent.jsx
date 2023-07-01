
import React, { useState } from "react";
import createNewStudentThunk from "../redux/Students.actions";
import axios from "axios";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState("");

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

  const handleForm = async (event) => {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa
    });
    await axios.post("http://localhost:8080/Routes/students/addstudent", {firstName, lastName, email, imageUrl, gpa });
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Add a new student through this form</h1>
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

export default AddStudent;
