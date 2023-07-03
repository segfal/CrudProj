import React, { useState } from "react";

const StudentsOnCampus = ({campusId, students}) => {
    const filterStudents = () => {
        // assuming students holds all the students 
        //filer is like a if else so it will only do the below it its true
       const filterStudents = students.filter((student) => student.campusId === campusId);
    }
    const studentsRelationship = () => {
        //if student has the same as campus ID
        const [id, setId] = useState([]);
        //each campus will have a list of student id's that contain the same id as campus
        if(filterStudents.length > 0){
           <h1> There are students in this campus. </h1> 
        } else{
            <h1> There are no students currently registered to this campus </h1>
        }
    }
    
    return(
        <h1>Student on campus</h1>
        
    )
}

export default StudentsOnCampus;