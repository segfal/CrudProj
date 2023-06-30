import React, { useState } from "react";

const AddCampus = () => {
    const [state, setState] = useState({
        name: "",
        location: "",
        imageUrl: "",
        description:""
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
        // Handle form submission logic here
      };

    return (
        <div>
            <h1>Add a new campus through this form</h1>
            <form onSubmit={handleForm}>
                <label htmlFor="name">Campus Name:</label>
                <input
                type="text"
                placeholder="Name"
                onChange={handleChange}
                />
                <label htmlFor="address">Campus Location:</label>
                <input
                type="text"
                placeholder="100 Campus Rd"
                onChange={handleChange}
                />
                <label htmlFor="imageUrl">Campus Image URL:</label>
                <input
                type="url"
                placeholder="http://www.image.com/"
                onChange={handleChange}
                />
                <label htmlFor="description">Description:</label>
                <input
                type="text"
                placeholder="Describe this campus"
                onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddCampus;