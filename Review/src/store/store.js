import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchCircuits } from "./api";

const initialState = [];

const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );

export const fetchData = ( ) => ( dispatch ) =>{
    console.log("fetchData action dispatched"); 
  return fetchCircuits()
    .then((res) => {
      console.log("fetchCircuits API response:", res); 
      dispatch(storeData(res));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      
    });
}

const dataReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return action.data;
        default: return state;
    }
};

const reducer = combineReducers( {
    data: dataReducer,
} );

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunk ) );