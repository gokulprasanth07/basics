import {
  GET_OKRS_DATA,
  LOAD_OKRS_DATA,
  TOGGLE_ERROR_STATE,
  TOGGLE_LOADED_STATE,
} from './constants';
export const getOkrsData = () => ({
  type: GET_OKRS_DATA,
});
export const loadOkrsData = payload => ({
  type: LOAD_OKRS_DATA,
  payload,
});
export const toggleDataLoadedState = payload => ({
  type: TOGGLE_LOADED_STATE,
  payload,
});
export const toggleErrorState = payload => ({
  type: TOGGLE_ERROR_STATE,
  payload,
});
