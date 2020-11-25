/* eslint-disable prefer-destructuring */
import produce from 'immer';
import {
  TOGGLE_LOADED_STATE,
  TOGGLE_ERROR_STATE,
  LOAD_OKRS_DATA,
} from './constants';

export const initialState = {
  isDataLoaded: false,
  errorInLoadingData: false,
  okrData: [],
};

const homepageReducer = (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    switch (action.type) {
      case LOAD_OKRS_DATA: {
        const payload = action.payload;
        return {
          ...state,
          okrData: payload,
        };
      }
      case TOGGLE_LOADED_STATE: {
        return {
          ...state,
          isDataLoaded: action.payload,
        };
      }
      case TOGGLE_ERROR_STATE: {
        return {
          ...state,
          errorInLoadingData: action.payload,
        };
      }
      default: {
        return { ...state };
      }
    }
  });
export default homepageReducer;
