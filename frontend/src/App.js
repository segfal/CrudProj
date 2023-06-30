import './App.css';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Campuses from './pages/Campuses'
import Students from './pages/Students'
import SingleCampus from './pages/SingleCampus';
import SingleStudent from './pages/SingleStudent';
import AddCampus from './pages/AddCampus';
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <Router>
      <div className="App">
          <nav>
              <ul>
                <li>
                  <Link to = "/"> Home </Link>
                </li>
                  <li>
                    <Link to = "/campus/*"> Campuses </Link>
                  </li>
                    <li>
                      <Link to = "/students/*"> Students </Link>
                    </li>
              </ul>
          </nav>

          {/* Routes*/}
          <Routes>
            <Route path = "/" element = {<Home/>} />
            <Route path = "campus/*" element= {<Campuses/>} />
            <Route path = "/students/*" element = {<Students/>} />
            <Route path = "/singleCampus/*" element= {<SingleCampus/>} />
            <Route path = "/singleStudent/*" element = {<SingleStudent/>} />
            <Route path = "/addCampus/*" element = {<AddCampus/>} />
            <Route path = "/addStudent/*" element = {<AddStudent />} />
           </Routes>
      </div>
    </Router>
  );
}

export default App;
