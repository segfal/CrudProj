import axios from "axios";
import StudentsActionType from './Students.types';

export const fetchStudents = (payload) => {
    console.log("FETCH ALL STUDENTS ACTION");
    return {
        type: StudentsActionType.FETCH_STUDENTS,
        payload: payload
    };
};
// Thunk function for fetching students asynchronously
export const fetchStudentsThunk = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get("http://localhost:8080/routes/students");
            console.log("axios call for students: " , res.data);
            dispatch(fetchStudents(res.data));
            console.log("dispatched");
        } catch (error) {
            console.log("an error has occured", error);
        }
    };
};

// Fetch single student
export const fetchSingleStudent = (payload) => {
    console.log("FETCH SINGLE STUDENT");
    return{
        type:StudentsActionType.FETCH_SINGLE_STUDENT,
        payload: payload
    };
}

export const fetchSingleStudentThunk = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:8080/routes/students/SingleStudent/${id}`);
            dispatch(fetchSingleStudent(res.data));
        } catch (error) {
            console.log("an error has occured", error)
        }
    }
}
// dispatch is necessary to dispatch the fetchStudents action with the fetched
//  data so that the students' data can be stored in the Redux store and made 
//  available to other parts of the application.