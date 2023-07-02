import React, { useState } from "react";
import createNewStudentThunk from "../redux/Students.actions";
import axios from "axios";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    console.log({
      firstName,
    });
    //Deleting by first name for testing
    await axios.delete("http://localhost:8080/Routes/students/deletestudent", {
      firstName,
    });
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Delete student through this form</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="firstName">Student's First Name:</label>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;
