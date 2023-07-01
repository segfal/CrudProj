import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesThunk } from "../redux/Campus.actions";
import campusReducer from "../redux/Campus.reducer";
import SingleCampus from "./SingleCampus";
import CampusItems from "../components/CampusItems";
import { useNavigate } from "react-router-dom";

const Campuses = () => {
    const navigate = useNavigate();
    const allCampuses = useSelector((state) => state.campuses.allCampuses);
    console.log("data: " + allCampuses);
    const dispatch = useDispatch();
    
    const fetchAllCampuses = () => {
      console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES')
      return dispatch(fetchCampusesThunk());
    };

    // Load database campuses upon mount
    useEffect(() => {
        console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
        fetchAllCampuses();
      }, []);

    // Add campus button leads to Add campus page
    const handleAdd = () => {
        let path = `/addCampus/*`;
        navigate(path);
    };

    return (
        <div>
            <h1>Welcome to the Campuses page</h1>
            <button type="button" class="btn btn-primary" onClick={handleAdd}>Add Campus</button>
            <CampusItems list={allCampuses}/>
            {/* <SingleCampus/> */}
        </div>
    )
}


export default Campuses;