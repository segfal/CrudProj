import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { editCampusThunk } from "../redux/Campus.actions";
import { useDispatch } from "react-redux";
import SingleCampus from "../pages/SingleCampus";
import axios from "axios";




const EditCampus = () => {

  const navigate = useNavigate();
  const campusId  = useParams();
  const dispatch = useDispatch();

 
  const [state, setState] = useState({
    name: "",
    location: "",
    imageUrl: "",
    description: "",

  });

  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "name"){
      setState({
        ...state,
        name: value,
      });
    }
    if(name === "location"){
      setState({
        ...state,
        location: value,
      });
    }
    if(name === "imageUrl"){
      setState({
        ...state,
        imageUrl: value,
      });
    }
    if(name === "description"){
      setState({
        ...state,
        description: value,
      });
    }
  };



  
  //takes campus id and updates the campus
  ///I wanna reduxify it
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(campusId);
    const id = campusId.id;



    dispatch(
      editCampusThunk(campusId.id,{
        id: id,
        name: state.name,
        location: state.location,
        imageUrl: state.imageUrl,
        description: state.description,
      })
    );
    navigate(`/campuses/${id}`);
    
  }

  return (
    <div>
   
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
          />
          <label htmlFor="location">Location</label>
          <input
            name="location"
            type="text"
            value={state.location}
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            type="text"
            value={state.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={state.description}
            onChange={handleChange}
          />
          </div>
          <button type="submit">Submit</button>
        </form>
    </div>
  );

};

export default EditCampus;
