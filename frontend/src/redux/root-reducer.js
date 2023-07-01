import { combineReducers } from "redux";
import campusReducer from "./Campus.reducer";
import studentReducer from "./Students.reducer";

const rootReducer = combineReducers({
  campuses: campusReducer,
  students: studentReducer
});

export default rootReducer;