import React, { useState } from "react";

const AddStudent = () => {
    const [state, setState] = useState({
        name: "",
        location: "",
        imageUrl: "",
        description:"",
        gpa: ""
      })
    
      const handleChange = (event) => {
        const value = event.target.value;
        setState({
          ...state,
          [event.target.name]: value
        });
      };
    
      const handleForm = (event) => {
        event.preventDefault();
        // const value = event.target.value;
        // if(value < 0.00 || value > 4.00){
        //     alert("Invalid GPA");
        // }
        // Handle form submission logic here
      };
      // const handleGPAChange = (event) => {

      // }

    return (
        <div>
            <h1>Add a new student through this form</h1>
            <form onSubmit={handleForm}>
                <label htmlFor="firstName">Student's First Name:</label>
                <input
                type="text"
                placeholder="Name"
                onChange={handleChange}
                />
                <label htmlFor="lastName">Student's Last Name:</label>
                <input
                type="text"
                placeholder="Name"
                onChange={handleChange}
                />
                <label htmlFor="email">Student Email:</label>
                <input
                type="text"
                placeholder="student.name@gmail.com"
                onChange={handleChange}
                />
                <label htmlFor="imageUrl">Student Image URL:</label>
                <input
                type="url"
                placeholder="http://www.image.com/"
                onChange={handleChange}
                />
                <label htmlFor="gpa">Student GPA:</label>
                <input
                type="float"
                name='gpa'
                placeholder="4.00"
                // value={state.gpa}
                onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddStudent;