import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { fetchCircuits } from "./api";

const initialState = {
    data:[],
};


//action creator to store data
const storeData = ( data ) => ( {
    type: "STORE_DATA",
    payload: data,
} );

//async action creator
export const fetchData = ( ) => ( dispatch ) =>{
    console.log("fetchData action dispatched"); 
  return fetchCircuits()
    .then((res) => {
    //   console.log("fetchCircuits API response:", res); 
      dispatch(storeData(res));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      
    });
}

//reducer to store the data
const dataReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return {...state, data: action.payload};
        default: return state;
    }
};

const reducer = combineReducers( {
    data: dataReducer,
} );

export default (  ) =>
    createStore( reducer, applyMiddleware( thunk ) );