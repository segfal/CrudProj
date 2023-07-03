// CURRENT ISSUE: Need to find a way to pass a singular campus's information into the single campus page and its function
import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//function component used to display a list of campuses
function CampusItems(props) {
  const navigate = useNavigate();
  const [currentCampus, setCurrentCampus] = useState(0);

  //used useEffect because we want to store the original value of currentCampus to zero. this is the best way to do it because
  //we want the initial value to be based off the first campus in the props.list array. So at the ending, we also see the 
  //empty dependency array [], we can make sure the effect runs only once. before i did this, we kept getting infinite loop errors
  //this useEffect solved that problem:
  // useEffect(() => {
  //   if(props.list && props.list.length > 0){
  //     // setCurrentCampus(props.list[0].id) 
  //     //sets the initial campus ID
  //     setCurrentCampus(props.list[0].id);
  //   }
  // }, [props.list] )

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

  const handleAdd = (campusId) => {
    let path = `/SingleCampus/${campusId}`; 
    console.log(campusId); 
    navigate(path); //navigate to the single campus view
  }

  const handleDelete = (currentCampus) => {
    
  } 

  // how to get id of a button
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((campus) => (
        <div key={campus.name}>
          {/* {setCurrentCampus(campus.id)}  this also caused the infinite loop error because we declared setCurrentCampus in useEffect before already and we shouldnt declare it again*/}
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
          id = {currentCampus}
          onClick = {() => handleAdd(campus.id)}>See More
          </button>
          {/* <Link to={`/SingleCampus/${campus.id}`}> </Link> */}
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