import React from "react";
import CampusesActionType from "./Campus.types";

export const initialCampusState = {
    allCampuses: [], //the inital state is an empty array
    //need to put in array since we'll have a list of data
    //where the fetched campuses data will be stored
}

const campusReducer = (state = initialCampusState, action) => {
    try{
        switch(action.type){
        case CampusesActionType.FETCH_CAMPUS:
            //copy the existing state, then update allCampuses which replaces previous 
            //campuses data with the newly fetched data
            return {...state, allCampuses: action.payload} //payload is the data

        default:
            return state;
             //returns the empty array (the initial state, allCampuses [])

         }
    } catch(error){
        
        console.log(error)
        return state; //return the current state in case of error
        
    }
}

export default campusReducer;
