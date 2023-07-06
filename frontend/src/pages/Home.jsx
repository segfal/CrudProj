import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Campuses from "./Campuses";

const Home = () => {
  return (
    <div className="bg-img">
      <div className="overlay">
        <div className="landing__container">
          <h1 className="heading">Welcome to The Campus Student Directory</h1>
          <p className="paragraph">Keep track of colleges, students, and their associations on this site, where you can create, read, update, or delete campus and student information.</p>
          <div className="button-container">
            <Link to="/campuses" className="Homebutton" id="gradient-button">Campuses Directory</Link>
            <Link to="/students" className="Homebutton" id="gradient-button">Students Directory</Link>
            {/* <Link to="/" className="Homebutton" id="gradient-button">Home Page</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
