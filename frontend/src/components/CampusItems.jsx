import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


  
//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h1>{props.location}</h1>
//       <img src={props.imageUrl} alt={props.name}/>    
//       <h1>{props.description}</h1>
//       <h1>{props.location}</h1>
//     </div>
//   );

// }

/*
  git 

*/




//function component used to display a list of campuses
function CampusItems(props) {
  const navigate = useNavigate();
  const [currentCampus, setCurrentCampus] = useState(0);

// CURRENT ISSUE: Need to find a way to pass a singular campus's information into the single campus page and its function

  const handleAdd = () => {
    let path = `/SingleCampus/${currentCampus}`; 
    console.log(currentCampus);
    navigate(path); //navigate to the single campus view
  }
  
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((campus) => (
        <div key={campus.name}>
          {/* below, set the current campus ID in state */}
          {setCurrentCampus(campus.id)}
          {/* display campus image */}
          <img src={campus.imageUrl} alt={campus.name}/>
          {/* display campus name */}
          <h2>{campus.name}</h2>
          {/* display campus location */}
          <h3>{campus.location}</h3>
          {/* display campus description */}
          <p>{campus.description}</p>
          <button type="button" class="btn btn-primary" onClick={handleAdd(currentCampus)}>See More</button>
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