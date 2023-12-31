import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages/pages.css'

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
  const handleSeeMore = (campusId) => {
    let path = `/SingleCampus/${campusId}`; 
    console.log("the campus id: " , campusId); 
    navigate(path); 
  }

  const handleImageError = (event) =>{
    event.target.src = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";
  }

  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((campus) => (
        <div className="campus-item" key={campus.name}>
          <div className="cardsForCampus">
          <img className="campus-item__img" src={campus.imageUrl} onError={handleImageError} alt={campus.name} width="300" height="300"/>
          <h2 className="campus-item__name">{campus.name}</h2>
          <h3 className="campus-item__location">{campus.location}</h3>
          <p className="campus-item__description">{campus.description}</p>
          <button type = 'button' 
          className='seeMore'
          id = {currentCampus}
          onClick = {() => handleSeeMore(campus.id)}>See More
          </button>
        </div>
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