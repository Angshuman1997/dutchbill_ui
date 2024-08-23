import { 
    TAB_SELECT, 
    USER_DATA, 
    SUM_EXP_API_TOGGLE, 
    SET_VALUE_4, 
    SET_VALUE_5 
  } from './types';
  
  export const setTabSelect = (value) => ({
    type: TAB_SELECT,
    payload: value,
  });
  
  export const setUserData = (value) => ({
    type: USER_DATA,
    payload: value,
  });
  
  export const setSumExpApiToggle = (value) => ({
    type: SUM_EXP_API_TOGGLE,
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
  