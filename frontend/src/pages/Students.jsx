import React,{useEffect,useState} from "react";
import SingleStudent from "./SingleStudent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StudentItems from "../components/StudentItems";
import StudentsActions from "../redux/Students.actions";
import fetchStudentsThunk from '../redux/Students.actions';


const Students = () => {
    const navigate = useNavigate();
    const allStudents = useSelector((state => state.Students.allStudents))
    console.log('data' + allStudents);
    const [everyStudent, setEveryStudent] = useState([])
    const dispatch = useDispatch();

    const fetchAllStudents = async () => {
        try{
            const res = await dispatch(fetchStudentsThunk());
            console.log('RUNNING DISPATCH FROM FETCHALLCAMPUSES');
            // return dispatch(fetchCampusesThunk());
        } catch (error){
            console.log("An error occured", error);
        }
    };

    useEffect(() => {
        console.log('FETCH ALL STUDENTS FIRING IN USEEFFECT')
        setEveryStudent(fetchAllStudents());

      }, []);
    
 
    const handleAdd = () => {
        let path = `/addStudent/*`;
        navigate(path);
    };

    return (
        <div>
            <h1>Welcome to the Students page</h1>
            <button type="button" class="btn btn-primary" onClick={handleAdd}>Add Student</button>
            {/*NEEDS TO BE CHANGED !! <StudentItems list={dummyData}/> */}
            <SingleStudent/>
        </div>
    )
}

export default Students;

