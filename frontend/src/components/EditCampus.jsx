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

    if (state.name.trim() === "") {
      setNameError("Please enter a campus name.");
      return;
    }
    if (state.location.trim() === "") {
      setLocationError("Please enter a campus location.");
      return;
    }
    if (state.imageUrl.trim() === "") {
      setImageUrlError("Please enter a campus image URL.");
      return;
    }
    if (state.description.trim() === "") {
      setDescriptionError("Please enter a campus description.");
      return;
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
    navigate(`/SingleCampus/${id}`);
    navigate(0);
  }

  return (
    <div className="card-container">
      <div className="card">
        <h1 className="card-heading">Edit the campus through this form</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="labels">Campus Name:</label>
            <input
              type="text"
              placeholder="Campus Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="form-input"
            />
            {nameError && (
              <div className="alert alert-danger"> {nameError} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="location" className="labels">Campus Address:</label>
            <input
              type="text"
              placeholder="100 Campus Rd"
              name="location"
              value={state.location}
              onChange={handleChange}
              className="form-input"
            />
            {locationError && (
            <div className="alert alert-danger"> {locationError} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl" className="labels">Campus Image Url:</label>
            <input
              type="url"
              placeholder="http://www.image.com/"
              name="imageUrl"
              value={state.imageUrl}
              onChange={handleChange}
              className="form-input"
            />
            {imageUrlError && (
            <div className="alert alert-danger"> {imageUrlError} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="labels">Campus Description:</label>
            <input
              type="text"
              placeholder="Describe this campus"
              name="description"
              value={state.description}
              onChange={handleChange}
              className="form-input"
            />
            {descriptionError && (
            <div className="alert alert-danger"> {descriptionError} </div>
            )}
          </div>
          <button type="submit" className="submit-button">
            <strong> SUBMIT </strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCampus;
