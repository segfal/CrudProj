import React, { useState } from "react";
import SingleCampus from "../pages/SingleCampus";
import { useNavigate,useParams } from "react-router-dom";

const StudentsOnCampus = ({ currentCampusId, allStudents }) => {
  const [id, setId] = useState([]);

  const navigate = useNavigate();
  //useparams
  ///console log current campusid and all students
  console.log("current campus id", currentCampusId);

  
  
  console.log("students: ", allStudents);
//   console.log("parsed campus id", parseInt(currentCampusId));
  console.log("from students on camps, not parsed campus id", currentCampusId);

  const filterStudents = () => {
    // Assuming students holds all the students 
    // Filter is like an if-else statement, it will only return the filtered students if the condition is true
    console.log("current campus id: ", currentCampusId);
    const filteredStudents = allStudents.filter((student) => student.campusId === currentCampusId);
    console.log("filtered Students: ", filteredStudents);
    return filteredStudents;
    }

    const handleSeeMore = (studentId) => {
      let path = `/SingleStudent/${studentId}`; 
      console.log(studentId); 
      navigate(path); 
    }

  const studentsRelationship = () => {
    // Check if students have the same campus ID
    // Each campus will have a list of student IDs that contain the same ID as the campus
    console.log(filterStudents());
    if (filterStudents().length> 0) {
      return (
        <div>
          {console.log("filtered Students: ", filterStudents())}
          {filterStudents().map((studentOnCampus) => (
            <div key={studentOnCampus.id}>
              <h3>
                Student Name: {studentOnCampus.firstName} {studentOnCampus.lastName}
              </h3>
              <img src={studentOnCampus.imageUrl} alt={studentOnCampus.firstName} />
              <button type = 'button' 
              class='btn btn-primary'
              onClick = {() => handleSeeMore(studentOnCampus.id)}>See More
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      return <h1>There are no students currently registered to this campus.</h1>;
    }
  };

  // Render the students relationship based on the campus ID
  return <div>{studentsRelationship()}</div>;
};

export default StudentsOnCampus;
