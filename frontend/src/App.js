import './App.css';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Campuses from './pages/Campuses'
import Students from './pages/Students'
import SingleCampus from './pages/SingleCampus';
import SingleStudent from './pages/SingleStudent';
import AddCampus from './pages/AddCampus';
import AddStudent from './pages/AddStudent';
// import DeleteStudent from './pages/DeleteStudent';
import EditCampus from './components/EditCampus';

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="logo-container">
        <ul>
          <li>
            <img
              src="https://www.ccny.cuny.edu/sites/default/files/CUNY%20LOGO%20JPEG.jpg"
              alt="Logo"
              className="logo"
            />
            </li>
          </ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/campus">
                Campuses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students">
                Students
              </Link>
            </li>
          </ul>
        </div>
      </nav>

          {/* Routes*/}
          <Routes>
            <Route path = "/" element = {<Home/>} />
            <Route path = "campus/" element= {<Campuses/>} />
            <Route path = "/students/" element = {<Students/>} />
            <Route path="/singleCampus/:campusId" element={<SingleCampus />} />
            <Route path = "/singleStudent/:studentId" element = {<SingleStudent/>} />
            <Route path = "/addCampus/" element = {<AddCampus/>} />
            <Route path = "/addStudent/" element = {<AddStudent />} />
            <Route path = "/editCampus/:studentid" element =  {<EditCampus/>} />
           </Routes>
      </div>
    </Router>
  );
}

export default App;