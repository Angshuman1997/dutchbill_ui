import { 
    TAB_SELECT, 
    SET_VALUE_2, 
    SET_VALUE_3, 
    SET_VALUE_4, 
    SET_VALUE_5 
  } from './types';
  
  export const setTabSelect = (value) => ({
    type: TAB_SELECT,
    payload: value,
  });
  
  export const setValue2 = (value) => ({
    type: SET_VALUE_2,
    payload: value,
  });
  
  export const setValue3 = (value) => ({
    type: SET_VALUE_3,
    payload: value,
  });
  
  export const setValue4 = (value) => ({
    type: SET_VALUE_4,
    payload: value,
  });
  
  export const setValue5 = (value) => ({
    type: SET_VALUE_5,
    payload: value,
  });
  