import React, { useState } from "react";
import SingleCampus from "../pages/SingleCampus";
import { useNavigate,useParams } from "react-router-dom";

const StudentsOnCampus = ({ currentCampusId, allStudents }) => {
  const [id, setId] = useState([]);
  const navigate = useNavigate();

  const filterStudents = () => {
    // Assuming students holds all the students 
    // Filter is like an if-else statement, it will only return the filtered students if the condition is true
    console.log("current campus id: ", currentCampusId);
    const filteredStudents = allStudents.filter((student) => student.campusId === currentCampusId);
    console.log("filtered Students: ", filteredStudents);
    console.log(allStudents);
    return filteredStudents;
    }

    const handleSeeMore = (studentId) => {
      let path = `/SingleStudent/${studentId}`; 
      navigate(path); 
    }

    const handleImageError = (event) => {
      event.target.src = "https://i.stack.imgur.com/l60Hf.png";
    }
  
  const studentsRelationship = () => {
    // Check if students have the same campus ID
    // Each campus will have a list of student IDs that contain the same ID as the campus
    console.log(filterStudents());
    if (filterStudents().length> 0) {
      return (
        <div className="studentsOnCampus">
          {console.log("filtered Students: ", filterStudents())}
          {filterStudents().map((studentOnCampus) => (
            <div className="studentOnCampus-item" key={studentOnCampus.id}>
              <h3>
                {studentOnCampus.firstName} {studentOnCampus.lastName}
              </h3>
              <img src={studentOnCampus.imageUrl} onError={handleImageError} alt={studentOnCampus.firstName} width="200" height ="150" />
              <button type = 'button' 
              class='btn btn-primary'
              onClick = {() => handleSeeMore(studentOnCampus.id)}>See More
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="noStudents-msg">There are no students currently registered to this campus. Add students to this campus by selecting an unenrolled student from the directory.</h1>
        </div>
      )
    }
  };

  // Render the students relationship based on the campus ID
  return <div>{studentsRelationship()}</div>;
};

export default StudentsOnCampus;
