import React from "react";
import StudentsActionType from "./StudentsType";

export const initialStudentState = {
    allStudents: [], //the inital state is an empty array
    //need to put in array since we'll have a list of data
    //where the fetched students data will be stored
}

const studentReducer = (state = initialStudentState, action) => {
    try{
        switch(action.type){
            case StudentsActionType.FETCH_STUDENTS:
                //copy the existing state, then update allStudents which replaces previous 
                //students data with the newly fetched data
                return {...state, allStudents: action.payload}
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