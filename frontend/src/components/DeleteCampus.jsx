import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";



function DeleteCampus() {

    const navigate = useNavigate();
    const { campusId } = useParams();

    

    const handleForm = async (event) => {
        event.preventDefault();
        await axios.delete(`http://localhost:8080/routes/campuses/deletecampus/${campusId}`);
        navigate("/campuses");
    }


    
    
    return (
        <form onSubmit={handleForm}>
            <h1>Delete Campus</h1>
            <button type="submit">Delete</button>
        </form>

    );

 }








export default DeleteCampus;
