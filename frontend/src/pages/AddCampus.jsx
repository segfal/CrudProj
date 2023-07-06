import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesThunk } from "../redux/Campus.actions";
import campusReducer from "../redux/Campus.reducer";
import './pages.css'

const AddCampus = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const [allCamp, setAllCamp] = useState([]);
  const dispatch = useDispatch();
  
  const fetchAllCampuses = async () => {
    try{
        const res = await dispatch(fetchCampusesThunk());
        console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES');
    } catch (error){
        console.log("An error occured", error);
    }
  };

  // Load database campuses upon mount
  useEffect(() => {
    console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
    setAllCamp(fetchAllCampuses());
  }, []);

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
    const newCampus = await axios.post("http://localhost:8080/Routes/campuses/addcampus", {
      name,
      location,
      imageUrl,
      description,
    });
    // Redirect to the new campus's page
    let path = `/SingleCampus/${newCampus.data.id}`; 
    navigate(path); 
    // Handle form submission logic here
  };

  return (
    <div className="card-container">
    <div className="card">
      <h1 className="card-heading">Add a new campus through this form</h1>
      <form onSubmit={handleForm} className="form">
        <div className="form-group">
          <label htmlFor="name" className="labels"> Campus Name:</label>
          <input
            type="text"
            placeholder="Campus Name"
            name="name"
            value={name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="labels">Campus Address:</label>
          <input
            type="text"
            placeholder="100 Campus Rd"
            name="location"
            value={location}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl" className="labels">Campus Image URL:</label>
          <input
            type="url"
            placeholder="http://www.image.com/"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="labels">Campus Description:</label>
          <input
            type="text"
            placeholder="Describe this campus"
            name="description"
            value={description}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default AddCampus;
