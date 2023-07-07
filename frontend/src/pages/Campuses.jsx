import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesThunk } from "../redux/Campus.actions";
import campusReducer from "../redux/Campus.reducer";
import SingleCampus from "./SingleCampus";
import CampusItems from "../components/CampusItems";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap"; // Assuming you're using react-bootstrap

import './pages.css'


const Campuses = () => {
    const navigate = useNavigate(); 
    const allCampuses = useSelector((state) => state.campuses.allCampuses);
    console.log("data: " + allCampuses);
    const [allCamp, setAllCamp] = useState([]);
    const dispatch = useDispatch();
    
    const fetchAllCampuses = async () => {
        try{
            const res = await dispatch(fetchCampusesThunk());
            console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES');
            // return dispatch(fetchCampusesThunk());
        } catch (error){
            console.log("An error occured", error);
        }
    };

    // Load database campuses upon mount
   
    useEffect(() => {
        console.log('FETCH ALL CAMPUSES FIRING IN USEEFFECT')
        setAllCamp(fetchAllCampuses());
      }, []);
    

    // Add campus button leads to Add campus page
    const handleAdd = () => {
        let path = `/addCampus/`;
        navigate(path);
    };

    return (
        
        <div className="campus-item" >
            <h1>Welcome to the Campuses page</h1>
            <button type="button" 
            className="btn btn-primary add-button" 
            onClick={handleAdd}
            >Add Campus</button>
            <section>
            <CampusItems list={allCampuses}/>
            </section>
        </div>
    )
}


export default Campuses;