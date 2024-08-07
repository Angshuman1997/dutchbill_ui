// src/reducers/valueReducer.js
import { 
    TAB_SELECT, 
    SET_VALUE_2, 
    SET_VALUE_3, 
    SET_VALUE_4, 
    SET_VALUE_5 
  } from '../actions/types';
  
  const initialState = {
    tabSelect: 'Overview',
    value2: null,
    value3: null,
    value4: null,
    value5: null,
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case TAB_SELECT:
        return {
          ...state,
          tabSelect: action.payload,
        };
      case SET_VALUE_2:
        return {
          ...state,
          value2: action.payload,
        };
      case SET_VALUE_3:
        return {
          ...state,
          value3: action.payload,
        };
      case SET_VALUE_4:
        return {
          ...state,
          value4: action.payload,
        };
      case SET_VALUE_5:
        return {
          ...state,
          value5: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  