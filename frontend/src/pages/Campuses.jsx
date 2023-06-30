import React from "react";
import SingleCampus from "./SingleCampus";
import dummyData from "./schools.json";
import CampusItems from "../components/CampusItems";
import { useNavigate } from "react-router-dom";

const Campuses = () => {
    const navigate = useNavigate();

    const handleAdd = () => {
        let path = `/addCampus/*`;
        navigate(path);
    };

    return (
        <div>
            <h1>Welcome to the Campuses page</h1>
            <button type="button" class="btn btn-primary" onClick={handleAdd}>Add Campus</button>
            <CampusItems list={dummyData}/>
            <SingleCampus/>
        </div>
    )
}

export default Campuses;