import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteCampus = () => {
  const [deleteCampusData, setDeleteCampusData] = useState({
    name: "",
    address: "",
    description: ""
  });

  const handleChange = (event) => {
    setDeleteCampusData({
      ...deleteCampusData,
      [event.target.name]: event.target.value
    });
    localStorage.setItem('deleteId', event.target.value)
    //this handleChange can also be written as:
    /*
    const handleChange=(e) => {setDeleteCampusData(e.target.value)}
    */
  };

  useEffect(() => {
    const savedDeleteId = localStorage.getItem('deleteId');
    if (savedDeleteId) {
      setDeleteCampusData({
        ...deleteCampusData,
        name: savedDeleteId
      });
    }
  }, []);
  
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.delete("http://localhost:8080/Routes/campuses", {
        data: deleteCampusData
      });

      console.log("Campus deleted:", res.data);
      setDeleteCampusData({
        name: "",
        address: "",
        description: ""
      });
    } catch (error) {
      console.log("An error has occurred with deletion:", error);
    }
  };

  return (
    <div>
      <h1>Delete a campus</h1>
      <form onSubmit={handleDelete}>
        <label htmlFor="name">Campus Name:</label>
        <input
          type="text"
          placeholder="Enter campus name"
          name="name"
          value={deleteCampusData.name}
          onChange={handleChange}
        />

        <label htmlFor="address">Campus Address:</label>
        <input
          type="text"
          placeholder="Enter campus address"
          name="address"
          value={deleteCampusData.address}
          onChange={handleChange}
        />

        <label htmlFor="description">Campus Description:</label>
        <input
          type="text"
          placeholder="Enter campus description"
          name="description"
          value={deleteCampusData.description}
          onChange={handleChange}
        />

        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteCampus;
