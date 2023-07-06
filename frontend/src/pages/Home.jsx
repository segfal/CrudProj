import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Campuses from "./Campuses";

const Home = () => {
  return (
    <>
    <p>
        <h1 className="heading" style={{marginTop:"1vh"}}>Welcome to the homepage</h1>
            <p className="paragraph">Write more here.</p>
        </p>
        <div className="container"> 

        {/* <p className="background-text">We salute the students</p> */}

            <div className="button-container" style={{marginTop:"40vh", borderRadius:"10px", backgroundColor:""}}>
            <Link to="/campuses" className="Homebutton" id="gradient-button">Campus Page</Link>
            <Link to="/students" className="Homebutton" id="gradient-button">Students Page</Link>
            <Link to="/" className="Homebutton" id="gradient-button">Home Page</Link>
            </div>
        </div>
        
    </>
  );
};

export default Home;
