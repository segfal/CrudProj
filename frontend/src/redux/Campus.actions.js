import axios from "axios";
import CampusesActionType from './Campus.types';

export const fetchCampuses = (payload) => {
    console.log("FETCH ALL CAMPUSES ACTION");
    return {
        type: CampusesActionType.FETCH_CAMPUS,
        payload: payload,
    };
};


export const deleteCampus = (payload) => {
    console.log("DELETE CAMPUS ACTION");
    return {
        type: CampusesActionType.DELETE_CAMPUS,
        payload: payload,
    };
};


// Thunk function for fetching campuses asynchronously
export const fetchCampusesThunk = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get("http://localhost:8080/routes/campuses");
            console.log("axios call for campuses: " , res.data);
            dispatch(fetchCampuses(res.data));
        } catch (error) {
            console.log("an error has occured", error);
        }
    };
};


// Thunk function for deleting a campus asynchronously
export const deleteCampusThunk = (campusId) => {
    return async (dispatch) => {
        try{
            const res = await axios.delete(`http://localhost:8080/routes/campuses/deletecampus/${campusId}`);
            console.log("axios call for deleting a campus: " , res.data);
            dispatch(deleteCampus(res.data));
        }
        catch (error) {
            console.log("an error has occured", error);
        }
    };
};

// dispatch is necessary to dispatch the fetchCampuses action with the fetched
//  data so that the campuses' data can be stored in the Redux store and made 
//  available to other parts of the application.