import React, { useState } from "react";
import axios from "axios";
import "./pages.css";

const AddCampus = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    console.log({
      name,
      location,
      imageUrl,
      description,
    });
    await axios.post("http://localhost:8080/Routes/campuses/addcampus", {
      name,
      location,
      imageUrl,
      description,
    });
    // Handle form submission logic here
  };

  return (
    <div className="inputs">
      <h1>Add a new campus through this form</h1>
      <div className="forms">
        <form onSubmit={handleForm}>
          <label htmlFor="name">Campus Name:</label>
          <input
            type="text"
            placeholder="Campus Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <label htmlFor="location">Campus Address:</label>
          <input
            type="text"
            placeholder="100 Campus Rd"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Campus Image URL:</label>
          <input
            type="url"
            placeholder="http://www.image.com/"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="description">Campus Description:</label>
          <input
            type="text"
            placeholder="Describe this campus"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCampus;
