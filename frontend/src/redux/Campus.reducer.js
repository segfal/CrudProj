import React from "react";
import CampusesActionType from "./Campus.types";

export const initialCampusState = {
    allCampuses: [], //the inital state is an empty array
    //need to put in array since we'll have a list of data
    //where the fetched students data will be stored
}

const campusReducer = (state=initialCampusState, {type, payload}) => {
    switch(type){
        case CampusesActionType.FETCH_CAMPUS:
            //copy the existing state, then update allStudents which replaces previous 
            //students data with the newly fetched data
            return {...state, allCampuses: payload}
        default:
            return state; 
            //returns the empty array (the initial state, allCampuses [])
    }
}

export default campusReducer;
