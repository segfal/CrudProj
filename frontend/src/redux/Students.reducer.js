import React from "react";
import StudentsActionType from "./Students.types";

export const initialStudentState = {
    allStudents: [], //the inital state is an empty array
    //need to put in array since we'll have a list of data
    //where the fetched students data will be stored
    singleStudent: {} // the initial state is a single object
}

const studentReducer = (state = initialStudentState, action) => {
    console.log("ACTION",action);
    try{
        switch(action.type){
            case StudentsActionType.FETCH_STUDENTS:
                //copy the existing state, then update allStudents which replaces previous 
                //students data with the newly fetched data
                return {...state, allStudents: action.payload}
            case StudentsActionType.FETCH_SINGLE_STUDENT:
                return {...state, singleStudent: action.payload}
            case StudentsActionType.EDIT_SINGLE_STUDENT:
                // Find the student in all students that needs to be substituted with the incoming edits and replace the stale one
                const allStudents = [...state.allStudents];
                console.log("action payload: ", action.payload.id);
                const matchId = (student) => student.id === action.payload.id;
                const targetStudentIdx = state.allStudents.findIndex(matchId);
                console.log("targetStudentIdx: ", targetStudentIdx)
                allStudents[targetStudentIdx] = action.payload;
                console.log("FIRING EDIT SINGLE STUDENT REDUCER");
                return {...state, allStudents: allStudents}
            
            default:
                return state; 
                //returns the empty array (the initial state, allStudents [])
        } 
    } catch(error){
        console.log(error);
        return state;
    }
}

export default studentReducer;