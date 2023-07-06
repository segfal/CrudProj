import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function StudentItems(props) {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(0);

  useEffect(() => {
      const fetchAllStudents = async () => {
        try{
          const res = await axios.get('');
          console.log(res);
          const students = await res.json()
          setCurrentStudent(students);
        } catch (error){
          console.log(error)
        }
      } 

  })

  //navigate to the single student view
  const handleAdd = (studentId) => {
    let path = `/SingleStudent/${studentId}`; 
    console.log(studentId); 
    navigate(path); 
  }

  //The alternate image to be displayed if original src img is broken
  const handleImageError = (event) => {
    event.target.src = "https://i.stack.imgur.com/l60Hf.png";
  }

  
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((student) => (
        <div key={student.firstName}>
          <img src={student.imageUrl} onError={handleImageError} alt={student.firstName} width="200" height="200"/>
          <h2>{student.firstName}</h2>
          <h2>{student.lastName}</h2>
          <h2>{student.email}</h2>
          <h2>{student.gpa}</h2>
          <button type = 'button' 
          class='btn btn-primary'
          id = {currentStudent}
          onClick = {() => handleAdd(student.id)}>See More
          </button>
        </div>
      ));
    } else {
      return <h1>There are no students registered in the database.</h1>;
    }
  } catch (error) {
    console.error("Error rendering StudentItem:", error);
    return <h1>An error occurred while rendering StudentItem.</h1>;
  }
}

export default StudentItems;