import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import studentReducer from './redux/Students.reducer';
// import { createLogger } from 'redux-logger';


const logger = createLogger({ collapsed: true });

const middleWare = composeWithDevTools(
    applyMiddleware(thunk, logger)
);

const store = createStore(studentReducer, middleWare);

export default store;
