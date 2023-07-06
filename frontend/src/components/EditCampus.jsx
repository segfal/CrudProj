import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleCampus from "../pages/SingleCampus";
import { useParams,useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
const EditCampus = () => {

  const navigate = useNavigate();
  const campusId  = useParams();
  const dispatch = useDispatch();

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
  
  
  //takes campus id and updates the campus
  ///I wanna reduxify it
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(campusId);
    const id = campusId.id;
    // const response = await axios.put(`http://localhost:8080/routes/campuses/updatecampus/${id}`, {
    //   name: name,
    //   location: location,
    //   imageUrl: imageUrl,
    //   description: description,

    // });
    // console.log("response", response);

    

    navigate(`/SingleCampus/${id}`);

   
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <label htmlFor="location">Location</label>
        <input  
          name="location"
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter location"
        />
        <label htmlFor="imageUrl">Image Url</label>
        <input

          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={handleChange}
          placeholder="Enter imageUrl"
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          value={description}
          onChange={handleChange}
          placeholder="Enter description"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default EditCampus;
