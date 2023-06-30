import axios from "axios";
import StudentsActionType from './StudentsType';

// action creator for fetching students:
const fetchStudents = (payload) => ({
    type: StudentsActionType.FETCH_STUDENTS,
    payload:payload,
})

// Thunk function for fetching students asynchronously
const fetchStudentsThunk = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get("http://localhost:8080/api/students");
            console.log("axios call for students: " , res.data);
            dispatch(fetchStudentsThunk(res.data));
        } catch (error) {
            console.log("an error has occured", error);
        }
    }
}

const createNewStudentThunk = (formData) => {
    return async (dispatch) => {
        try {
            const createNewStudent = await axios.post("http://localhost:8080/api/students/addstudent", formData);
            dispatch(createNewStudentThunk(res.data));
        } catch (error) {
            console.log("an error has occured", error);
        }
    }
}

export default {fetchStudentsThunk, createNewStudentThunk};
// dispatch is necessary to dispatch the fetchStudents action with the fetched
//  data so that the students' data can be stored in the Redux store and made 
//  available to other parts of the application.