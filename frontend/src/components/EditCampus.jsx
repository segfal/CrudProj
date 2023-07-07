import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { editCampusThunk } from "../redux/Campus.actions";
import { useDispatch } from "react-redux";



const EditCampus = () => {
  const navigate = useNavigate();
  const campusId = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    location: "",
    imageUrl: "",
    description: "",
  });
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setState({
        ...state,
        name: value,
      });
    }
    if (name === "location") {
      setState({
        ...state,
        location: value,
      });
    }
    if (name === "imageUrl") {
      setState({
        ...state,
        imageUrl: value,
      });
    }
    if (name === "description") {
      setState({
        ...state,
        description: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = campusId.id;

    let isValid = true;

    if (state.name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    
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
          {nameError && <div className="alert alert-danger">{nameError}</div>}
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            name="location"
            type="text"
            value={state.location}
            onChange={handleChange}
          />
          {locationError && (
            <div className="alert alert-danger">{locationError}</div>
          )}
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            name="imageUrl"
            type="text"
            value={state.imageUrl}
            onChange={handleChange}
          />
          {imageUrlError && (
            <div className="alert alert-danger">{imageUrlError}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={state.description}
            onChange={handleChange}
          />
          {descriptionError && (
            <div className="alert alert-danger">{descriptionError}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditCampus;
