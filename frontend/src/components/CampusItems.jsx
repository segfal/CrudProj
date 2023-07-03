// CURRENT ISSUE: Need to find a way to pass a singular campus's information into the single campus page and its function

import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

//function component used to display a list of campuses
function CampusItems(props) {
  const navigate = useNavigate();
  const [currentCampus, setCurrentCampus] = useState(0);

  //used useEffect because we want to store the original value of currentCampus to zero. this is the best way to do it because
  //we want the initial value to be based off the first campus in the props.list array. So at the ending, we also see the 
  //empty dependency array [], we can make sure the effect runs only once. before i did this, we kept getting infinite loop errors
  //this useEffect solved that problem:
  useEffect(() => {
    if(props.list && props.list.length > 0){
      setCurrentCampus(props.list[0].id) //sets the initial campus ID
    }
  }, [] )

  const handleAdd = () => {
    let path = `/SingleCampus/${currentCampus}`; 
    console.log(currentCampus);
    navigate(path); //navigate to the single campus view
  }

  const handleDelete = (campusId) => {
    
  } 

  
  try {
    if (props.list && props.list.length > 0) {

      return props.list.map((campus) => (
        <div key={campus.name}>
          {/* display campus image */}
          <img src={campus.imageUrl} alt={campus.name}/>
          {/* display campus name */}
          <h2>{campus.name}</h2>
          {/* display campus location */}
          <h3>{campus.location}</h3>
          {/* display campus description */}
          <p>{campus.description}</p>
          {/*this BELOW is incorrect because we did handleAdd right away without passing it as a callback. */}
          {/* <button type="button" class="btn btn-primary" onClick={handleAdd(currentCampus)}>See More</button> */}
          {/* ^the correct way: */}
          <button type = 'button' 
          class='btn btn-primary' 
          onClick = {() => handleAdd(currentCampus)}>See More
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