import React from "react";
import CampusesActionType from "./Campus.types";

export const initialCampusState = {
    allCampuses: [], //the inital state is an empty array
    //need to put in array since we'll have a list of data
    //where the fetched campuses data will be stored
    singleCampus: {} // the initial state is a single object
}

const campusReducer = (state = initialCampusState, action) => {
    try{
        switch(action.type){
        case CampusesActionType.FETCH_CAMPUS:
            //copy the existing state, then update allCampuses which replaces previous 
            //campuses data with the newly fetched data
            return {...state, allCampuses: action.payload} //payload is the data

        case CampusesActionType.DELETE_CAMPUS:
            //copy the existing state, then update allCampuses which replaces previous
            //campuses data with the newly fetched data
            return {...state, allCampuses: action.payload} //payload is the data

        case CampusesActionType.EDIT_CAMPUS:
            // Find the campus in all campuses that needs to be substituted with the incoming edits and replace the stale one
            const allCampuses = [...state.allCampuses];
            console.log("action payload: ", action.payload.id);
            const matchId = (campus) => campus.id === action.payload.id;
            const targetCampusIdx = state.allCampuses.findIndex(matchId);
            console.log("targetCampusIdx: ", targetCampusIdx);
            
            allCampuses[targetCampusIdx] = action.payload;
            console.log("FIRING EDIT SINGLE CAMPUS REDUCER");

            return {...state, allCampuses: allCampuses}
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
