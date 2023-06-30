import React from "react";
import SingleStudent from "./SingleStudent";
import dummyData from "./schools.json";
import StudentItems from "../components/StudentItems";
import { useNavigate } from "react-router-dom";

const Students = () => {
    const navigate = useNavigate();

    const handleAdd = () => {
        let path = `/addStudent/*`;
        navigate(path);
    };

    return (
        <div>
            <h1>Welcome to the Students page</h1>
            <button type="button" class="btn btn-primary" onClick={handleAdd}>Add Student</button>
            <StudentItems list={dummyData}/>
            <SingleStudent/>
        </div>
    )
}

export default Students;