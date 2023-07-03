// CURRENT ISSUE: Need to find a way to pass a singular campus's information into the single campus page and its function
import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//function component used to display a list of campuses
function CampusItems(props) {
  const navigate = useNavigate();
  const [currentCampus, setCurrentCampus] = useState(0);

  useEffect(() => {
      const fetchAllCampuses = async () => {
        try{
          const res = await axios.get('');
          console.log(res);
          const campuses = await res.json()
          setCurrentCampus(campuses);
        } catch (error){
          console.log(error)
        }
      } 

  })

  //navigate to the single campus view
  const handleAdd = (campusId) => {
    let path = `/SingleCampus/${campusId}`; 
    console.log(campusId); 
    navigate(path); 
  }

  const handleDelete = (currentCampus) => {
    
  } 

  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((campus) => (
        <div key={campus.name}>
          <img src={campus.imageUrl} alt={campus.name}/>
          <h2>{campus.name}</h2>
          <h3>{campus.location}</h3>
          <p>{campus.description}</p>
          <button type = 'button' 
          class='btn btn-primary'
          id = {currentCampus}
          onClick = {() => handleAdd(campus.id)}>See More
          </button>
        </div>
      ));
    } else {
      return <h1>There are no campuses registered in the database.</h1>;
    }
  } catch (error) {
    console.error("Error rendering CampusItem:", error);
    return <h1>An error occurred while rendering CampusItem.</h1>;
  }
}
 

export default CampusItems;