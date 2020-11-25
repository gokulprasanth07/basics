/**
 * Homepage selectors
 */
import { initialState } from './reducer';
import { get } from '../../utils/helpers';
import { getformattedData, getCategories } from '../../utils/helpers';

const selectHome = state => state.homepage || initialState;
const selectOkrData = state => {
  return get(state, 'homepage.okrData', []);
};
const selectformattedOkrData = state => {
  const data = get(state, 'homepage.okrData', []);
  return getformattedData(data);
};

const selectCategories = state => {
  const data = get(state, 'homepage.okrData', []);
  return getCategories(data);
};

const selectDataLoading = state => {
  return get(state, 'homepage.isDataLoaded', false);
};

const selectErrorDataLoading = state => {
  return get(state, 'homepage.errorInLoadingData', false);
};

export {
  selectHome,
  selectOkrData,
  selectformattedOkrData,
  selectCategories,
  selectDataLoading,
  selectErrorDataLoading,
};
