import axios from "axios";
import StudentsActionType from './Students.types';

export const fetchStudents = (payload) => {
    console.log("FETCH ALL STUDENTS ACTION");
    return {
        type: StudentsActionType.FETCH_STUDENTS,
        payload: payload
    };
};

// Action Creator
export const editSingleStudent = (payload) => {
    //Action
    return {
        type: StudentsActionType.EDIT_SINGLE_STUDENT,
        payload: payload
    }
}

export const editSingleStudentThunk = (id,student) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`http://localhost:8080/routes/students/updatestudent/${id}`,student);
            dispatch(editSingleStudent(res.data)); // send argument straight to the reducer of the store
        }   catch (error) {
            console.log("an error has occured", error)
        }

    }

}

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
            console.log(id)
            const res = await axios.get(`http://localhost:8080/routes/students/SingleStudent/${id.id}`);

            dispatch(fetchSingleStudent(res.data));
        } catch (error) {
            console.log("an error has occured", error)
        }
    }
}
// dispatch is necessary to dispatch the fetchStudents action with the fetched
//  data so that the students' data can be stored in the Redux store and made 
//  available to other parts of the application.