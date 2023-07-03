import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsThunk,fetchStudents } from "../redux/Students.actions";
import studentReducer from "../redux/Students.reducer";
import StudentItems from "../components/StudentItems";
import { useNavigate } from "react-router-dom";

const Students = () => {
    
    const navigate = useNavigate();
 
    const allStudents = useSelector((state) => state.students.allStudents);
    
    console.log('data: ' + allStudents);
    const [everyStudent, setEveryStudent] = useState([])
    const dispatch = useDispatch();

    const fetchAllStudents = async () => {
        try{
            const res = await dispatch(fetchStudentsThunk());
            console.log('RUNNING DISPATCH FROM FETCHALLSTUDENTS');
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
            <StudentItems list={allStudents}/>
        </div>
    )
}

export default Students;

