import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Campuses from "./Campuses";

const Home = () => {
  return (
    <div className="container"> 
      <p>
        <h1 className="heading">Welcome to the homepage</h1>
        <p className="paragraph">Write more here.</p>
      </p>
        <div className="button-container" style={{marginTop:"40vh", borderRadius:"10px", backgroundColor:""}}>
          <Link to="/campuses" className="Homebutton" id="gradient-button">Campuses Directory</Link>
          <Link to="/students" className="Homebutton" id="gradient-button">Students Directory</Link>
          {/* <Link to="/" className="Homebutton" id="gradient-button">Home Page</Link> */}
        </div>
    </div>
  );
};

export default Home;
