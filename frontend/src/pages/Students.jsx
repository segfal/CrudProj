import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsThunk,fetchStudents } from "../redux/Students.actions";
import studentReducer from "../redux/Students.reducer";
import StudentItems from "../components/StudentItems";
import { useNavigate } from "react-router-dom";
import './pages.css'

const Students = () => {
    
    const navigate = useNavigate(); // used to navigate to other pages
 
    const allStudents = useSelector((state) => state.students.allStudents); // get all students from redux store
    
    console.log('data: ' + allStudents);
    const [everyStudent, setEveryStudent] = useState([]) // used to store all students from redux store
    const dispatch = useDispatch(); // used to dispatch an action to redux store

    const fetchAllStudents = async () => {
        try{
            const res = await dispatch(fetchStudentsThunk()); // dispatch an action to fetch all students
            console.log('RUNNING DISPATCH FROM FETCHALLSTUDENTS'); 
        } catch (error){
            console.log("An error occured", error);
        }
    };

    useEffect(() => {
        console.log('FETCH ALL STUDENTS FIRING IN USEEFFECT')
        setEveryStudent(fetchAllStudents()); // set the state of everyStudent to all students from redux store
      }, []);
    
 
    const handleAdd = () => {
        let path = `/addStudent/`; // navigate to add student page
        navigate(path); // navigate to add student page
    };

    return (
        <div className="grid-box">
        <h1>Welcome to the Students page</h1>
        <button type="button" className="btn btn-primary add-button" onClick={handleAdd}>Add Student</button>
        <section>
            <div className="card-grid">
            <StudentItems list={allStudents} />
            </div>
        </section>
    </div>
);
}

export default Students;

