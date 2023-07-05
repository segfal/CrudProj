import './App.css';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Campuses from './pages/Campuses'
import Students from './pages/Students'
import SingleCampus from './pages/SingleCampus';
import SingleStudent from './pages/SingleStudent';
import AddCampus from './pages/AddCampus';
import AddStudent from './pages/AddStudent';
import EditCampus from './components/EditCampus';

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
                    <Link to = "/campus/"> Campuses </Link>
                  </li>
                    <li>
                      <Link to = "/students/"> Students </Link>
                    </li>
              </ul>
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
            
            <Route path = "/editCampus/:campusId" element =  {<EditCampus/>} />
           </Routes>
      </div>
    </Router>
  );
}

export default App;
