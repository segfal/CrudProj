import React, { useState } from "react";
import SingleCampus from "../pages/SingleCampus";

const StudentsOnCampus = ({campusId, students}) => {
    const [id, setId] = useState([]);
    const filterStudents = () => {
        // assuming students holds all the students 
        //filer is like a if else so it will only do the below it its true
       const filterStudents = students.filter((student) => student.campusId === campusId);
    }
    const studentsRelationship = () => {
        //if student has the same as campus ID
        //each campus will have a list of student id's that contain the same id as campus
        if(filterStudents.length > 0){
           <h1> There are students in this campus. </h1> 
           {filterStudents.map((studentOnCampus) => (
            <h1></h1>
            ))}
        } else{
            <h1> There are no students currently registered to this campus </h1>
        }
    }
    
    return(
        {studentsRelationship}
    )
}

export default StudentsOnCampus;